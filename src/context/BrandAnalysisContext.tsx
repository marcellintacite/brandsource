import React, { createContext, useContext, useMemo } from 'react';
import { useBrandAnalysis } from '../hooks/useBrandAnalysis';
import { useAuth } from '../hooks/useAuth';
import { db } from '../services/firebase';
import { collection, query, where, orderBy, limit, DocumentData } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { COLLECTIONS } from '../constants/firebase';
import { BrandAnalysisDoc } from '../types';

interface BrandAnalysisContextType extends ReturnType<typeof useBrandAnalysis> {
  userAnalyses: BrandAnalysisDoc[];
  loadingAnalyses: boolean;
}

const BrandAnalysisContext = createContext<BrandAnalysisContextType | null>(null);

export const BrandAnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const brandAnalysis = useBrandAnalysis();
  const { user } = useAuth();

  const analysesQuery = useMemo(() => {
    if (!user) return null;
    return query(
      collection(db, COLLECTIONS.ANALYSES),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
  }, [user]);

  const [snapshot, loading] = useCollection(analysesQuery);

  const userAnalyses = useMemo(() => {
    if (!snapshot) return [];
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BrandAnalysisDoc[];
  }, [snapshot]);

  const value = {
    ...brandAnalysis,
    userAnalyses,
    loadingAnalyses: loading,
  };

  return (
    <BrandAnalysisContext.Provider value={value}>
      {children}
    </BrandAnalysisContext.Provider>
  );
};

export const useBrandAnalysisContext = () => {
  const context = useContext(BrandAnalysisContext);
  if (!context) {
    throw new Error('useBrandAnalysisContext must be used within a BrandAnalysisProvider');
  }
  return context;
};
