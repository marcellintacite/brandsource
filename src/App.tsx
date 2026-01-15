import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useBrandAnalysisContext } from './context/BrandAnalysisContext';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StudioPage from './components/pages/StudioPage';
import ProjectsPage from './components/pages/ProjectsPage';

function App() {
  const { status, reset, userAnalyses, selectProject, loadingAnalyses } = useBrandAnalysisContext();
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white whitespace-nowrap">
        <div className="w-8 h-8 border-2 border-slate-100 border-t-slate-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden pt-[68px] md:pt-[76px]">
      <Navbar status={status} reset={reset} />

      <Routes>
        {/* Redirect logic: Prevent auto-redirect to allow StudioPage to handle deferred auth flow */}
        <Route 
          path="/" 
          element={<StudioPage />} 
        />
        
        {/* Studio path: Never redirect away automatically, allowing user to stay after login if they were here */}
        <Route 
          path="/studio/:id?" 
          element={<StudioPage />} 
        />
        
        <Route 
          path="/projets" 
          element={
            user ? (
              <ProjectsPage 
                analyses={userAnalyses} 
                onSelectProject={selectProject} 
                onReset={reset}
                loading={loadingAnalyses}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
