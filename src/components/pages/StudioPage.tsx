import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LogoUploader from '../features/LogoUploader';
import BrandDashboard from '../features/BrandDashboard';
import { useAuth } from '../../hooks/useAuth';
import { useBrandAnalysisContext } from '../../context/BrandAnalysisContext';
import { getTotalGenerations } from '../../services/firebase';

const StudioPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState<number | null>(null);
  
  const {
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
    userAnalyses,
    loadingAnalyses
  } = useBrandAnalysisContext();

  const { user, loginWithGoogle } = useAuth();

  useEffect(() => {
    getTotalGenerations()
      .then(count => setTotalItems(count))
      .catch(err => {
        console.warn("Analytics fetch failed", err);
        setTotalItems(0);
      });
  }, []);

  // Handle URL-based project loading
  useEffect(() => {
    if (id && userAnalyses.length > 0) {
      const project = userAnalyses.find(a => a.id === id);
      if (project) {
        selectProject(project);
      } else if (!loadingAnalyses) {
        navigate('/studio', { replace: true });
      }
    }
  }, [id, userAnalyses, loadingAnalyses, selectProject, navigate]);

  const onImageSelected = async (base64: string, category: string) => {
    let currentUser = user;
    if (!currentUser) {
      try {
        currentUser = await loginWithGoogle();
      } catch (err) {
        console.error("Login failed", err);
        return;
      }
    }

    if (currentUser) {
      if (userAnalyses.length < 15) { 
        try {
          const newProjectId = await handleImageSelected(base64, category, currentUser.uid, currentUser.displayName || undefined);
          if (newProjectId) {
            navigate(`/studio/${newProjectId}`, { replace: true });
          }
        } catch (err) {
          console.error("Analysis failed", err);
        }
      } else {
        setStatus('error');
        setError("Limite atteinte : Vous avez déjà généré le maximum de studios autorisés.");
      }
    }
  };

  return (
    <main className={`relative w-full flex flex-col items-center flex-1 overflow-hidden ${status === 'idle' ? 'justify-center py-12 md:py-20 animate-in fade-in duration-1000' : ''}`}>
      {/* Immersive Background Decor */}
      {status === 'idle' && !id && (
        <>
          <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-orange-100/40 rounded-full blur-[120px] -z-10 animate-pulse transition-all duration-[4000ms]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-50/50 rounded-full blur-[100px] -z-10 animate-pulse transition-all duration-[6000ms] delay-700"></div>
        </>
      )}

      {/* Quick Switcher */}
      {user && userAnalyses.length > 0 && (status === 'completed' || !!id) && (
        <div className="w-full max-w-7xl px-6 py-4 flex items-center gap-4 overflow-x-auto no-scrollbar animate-in slide-in-from-top-4 duration-500 mb-8 border-b border-slate-50 bg-white/50 sticky top-[60px] z-50 backdrop-blur-sm">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">Switch Studio :</span>
          {userAnalyses.map((analysis) => (
            <button
              key={analysis.id}
              onClick={() => navigate(`/studio/${analysis.id}`)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all whitespace-nowrap border active:scale-95 ${
                id === analysis.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                  : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300 shadow-sm'
              }`}
            >
              {analysis.brandIdentity.companyName}
            </button>
          ))}
          <button 
            onClick={() => { reset(); navigate('/studio'); }}
            className="px-4 py-2 rounded-xl text-[10px] font-bold transition-all whitespace-nowrap border border-dashed border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-600 active:scale-95"
          >
            + Nouveau
          </button>
        </div>
      )}

      {status === 'idle' && !id && (
        <div className="max-w-6xl w-full flex flex-col items-center text-center space-y-12 md:space-y-20 px-6">
          <div className="space-y-6 md:space-y-8 w-full mt-4 md:mt-0">
            <div className="flex flex-col items-center gap-6">
               {(totalItems !== null) && (
                 <div className="flex items-center gap-3 px-6 py-2.5 bg-orange-50/50 rounded-full border border-orange-100 animate-in slide-in-from-top-4 duration-700">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 shadow-sm" style={{ background: `linear-gradient(${45 + i * 20}deg, #f97316, #fbbf24)` }}></div>
                      ))}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-600/80">
                      Rejoignez <span className="text-orange-600 font-black">+{totalItems > 0 ? totalItems.toLocaleString() : "250"}</span> créateurs de marques
                    </p>
                 </div>
               )}
               <h2 className="text-[2.25rem] sm:text-7xl md:text-8xl lg:text-[9.5rem] font-brand font-bold leading-[1.1] md:leading-[0.8] tracking-tighter text-slate-900 px-2 lg:-ml-4">
                 L'Identité <br className="hidden sm:block"/> <span className="brand-text-primary italic">Intuitive.</span>
               </h2>
            </div>
            <p className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto pt-2 md:pt-4 leading-relaxed font-medium px-4">
              Un simple logo suffit. Notre IA construit un univers de marque complet : palette, typos, maquettes studio et inspirations lifestyle.
            </p>
          </div>
          <div className="w-full max-w-xl mx-auto active:scale-[0.99] transition-transform">
            <LogoUploader onImageSelected={onImageSelected} disabled={false} />
          </div>
        </div>
      )}

      {(status === 'analyzing' || status === 'generating') && (
        <div className="flex flex-col items-center py-20 relative px-6 w-full max-w-4xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-[120px] -z-10 animate-pulse transition-all duration-[3000ms]"></div>
          
          <div className="relative group">
            <div className="absolute inset-[-20px] flex items-center justify-center">
              <svg className="w-[440px] h-[440px] animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-100" />
                <circle cx="50" cy="50" r="48" fill="none" stroke="url(#gradient)" strokeWidth="1.5" strokeDasharray="60 180" strokeLinecap="round" className="brand-text-primary" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="w-80 h-80 bg-white border border-slate-50/50 rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] flex items-center justify-center p-12 relative overflow-hidden transition-all duration-700 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]">
              {logoImage && (
                <img src={logoImage} className="w-48 h-48 object-contain rounded-3xl opacity-90 drop-shadow-[0_45px_90px_rgba(0,0,0,0.12)]" alt="" />
              )}
            </div>
          </div>

          <div className="text-center space-y-8 mt-20 relative z-10 w-full max-md">
            <div className="space-y-2">
              <h2 className="text-5xl font-brand font-bold text-slate-900 tracking-tighter">
                {status === 'analyzing' ? "Codage ADN..." : "Production Studio..."}
              </h2>
              <p className="text-slate-500 text-xl font-medium">
                {status === 'analyzing' ? "Analyse colorimétrique." : "Génération haute fidélité."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Progression</span>
                <span className="text-2xl font-brand font-bold text-slate-900 leading-none">{progress}%</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                <div 
                  className="h-full brand-bg-primary transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                {progress < 25 ? "Analyse du logo..." : 
                 progress < 50 ? "Création de la palette..." : 
                 progress < 80 ? "Génération des maquettes..." : 
                 "Finalisation du studio..."}
              </p>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="max-w-2xl w-[90%] bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 text-center shadow-2xl space-y-8 animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div className="space-y-3">
            <p className="text-slate-900 font-bold text-2xl md:text-3xl tracking-tight leading-none">Limite Atteinte</p>
            <p className="text-slate-500 font-medium px-4">{error}</p>
            <button onClick={() => { reset(); navigate('/studio'); }} className="mt-4 px-6 py-2 bg-slate-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-200 transition-all">Démarrer une nouvelle analyse</button>
          </div>
        </div>
      )}

      {brandIdentity && (status === 'generating' || status === 'completed') && (
        <BrandDashboard identity={brandIdentity} images={generatedImages} logoUrl={logoImage || ''} />
      )}
    </main>
  );
};

export default StudioPage;
