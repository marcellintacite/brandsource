import { initializeApp, getApps, getApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, getCountFromServer } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAI, GoogleAIBackend } from 'firebase/ai';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Singleton initialization to prevent multiple instances
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Export standard services for react-firebase-hooks
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Export Firebase AI Logic service
export const ai = getAI(app, { backend: new GoogleAIBackend() });

export const getTotalGenerations = async () => {
  try {
    const coll = collection(db, 'analyses');
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  } catch (error) {
    console.warn("Could not fetch global analytics:", error);
    return 0; // Fallback
  }
};

// Optional: Analytics
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) getAnalytics(app);
  });
}

export default app;
