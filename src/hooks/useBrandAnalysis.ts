import { useState } from 'react';
import { analyzeLogo, generateImage } from '../services/geminiService';
import { BrandIdentity, AppStatus, GeneratedImages, BrandAnalysisDoc } from '../types';
import { db, storage } from '../services/firebase';
import { collection, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { COLLECTIONS, STORAGE_PATHS } from '../constants/firebase';

export const useBrandAnalysis = () => {
  const [status, setStatus] = useState<AppStatus>('idle');
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [brandIdentity, setBrandIdentity] = useState<BrandIdentity | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImages>({});
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadToStorage = async (path: string, base64: string) => {
    const storageRef = ref(storage, path);
    await uploadString(storageRef, base64, 'data_url');
    return await getDownloadURL(storageRef);
  };

  const handleImageSelected = async (base64: string, category: string, userId?: string, userName?: string) => {
    setLogoImage(base64);
    setStatus('analyzing');
    setError(null);
    setGeneratedImages({});
    setProgress(5);

    try {
      // 1. Analysis
      const identity = await analyzeLogo(base64, category);
      setBrandIdentity(identity);
      setProgress(20);
      
      // Dynamic theme application
      document.documentElement.style.setProperty('--brand-primary', identity.brandColors.primary);
      document.documentElement.style.setProperty('--brand-secondary', identity.brandColors.secondary);
      
      setStatus('generating');

      const assets = Object.entries(identity.visualAssets);
      const progressPerAsset = 80 / assets.length;

      // Upload logo to Storage early to get URL for prompts
      let finalLogoUrl = base64;
      if (userId) {
        try {
          finalLogoUrl = await uploadToStorage(`${STORAGE_PATHS.LOGOS}/${userId}_${Date.now()}.png`, base64);
          setLogoImage(finalLogoUrl);
        } catch (e) {
          console.warn("Logo storage upload failed", e);
        }

        const docData: Omit<BrandAnalysisDoc, 'id'> = {
          userId,
          category,
          logoUrl: finalLogoUrl,
          brandIdentity: identity,
          generatedImages: {},
          createdAt: serverTimestamp(),
          progress: 20
        };
        const docRef = await addDoc(collection(db, COLLECTIONS.ANALYSES), docData);

        // Generation Loop
        (async () => {
          const finalImages: any = {};
          for (let i = 0; i < assets.length; i++) {
            const [key, prompt] = assets[i];
            try {
              const base64Img = await generateImage(prompt, identity, { logoUrl: finalLogoUrl, userName });
              const storagePath = `${STORAGE_PATHS.GENERATED_IMAGES}/${userId}/${docRef.id}/${key}.png`;
              const downloadUrl = await uploadToStorage(storagePath, base64Img);
              
              finalImages[key] = downloadUrl;
              setGeneratedImages(prev => ({ ...prev, [key]: downloadUrl }));
              
              const currentProgress = Math.round(20 + ((i + 1) * progressPerAsset));
              setProgress(currentProgress);
              await updateDoc(docRef, { 
                generatedImages: finalImages,
                progress: currentProgress
              });

            } catch (e) {
              console.warn(`Failed to generate/upload ${key}`, e);
            }
          }

          setStatus('completed');
          setProgress(100);
        })();

        return docRef.id;
      }
    } catch (err) {
      console.error(err);
      setError("Désolé, une erreur technique a interrompu la création de votre studio de marque.");
      setStatus('error');
      setProgress(0);
      throw err;
    }
  };

  const selectProject = (project: BrandAnalysisDoc) => {
    if (project) {
      setBrandIdentity(project.brandIdentity);
      setGeneratedImages(project.generatedImages);
      setLogoImage(project.logoUrl);
      setStatus(project.progress && project.progress < 100 ? 'generating' : 'completed');
      setProgress(project.progress || 100);
      
      document.documentElement.style.setProperty('--brand-primary', project.brandIdentity.brandColors.primary);
      document.documentElement.style.setProperty('--brand-secondary', project.brandIdentity.brandColors.secondary);
    }
  };

  const reset = () => {
    setStatus('idle');
    setLogoImage(null);
    setBrandIdentity(null);
    setGeneratedImages({});
    setError(null);
    setProgress(0);
    document.documentElement.style.setProperty('--brand-primary', '#f97316');
    document.documentElement.style.setProperty('--brand-secondary', '#fbbf24');
  };

  return {
    status,
    logoImage,
    brandIdentity,
    generatedImages,
    error,
    progress,
    handleImageSelected,
    selectProject,
    reset,
    setStatus,
    setError,
  };
};
