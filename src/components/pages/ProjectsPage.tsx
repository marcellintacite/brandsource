import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandAnalysisDoc } from '../../types';
import { DashboardSkeleton } from '../ui/Skeletons';

interface ProjectsPageProps {
  analyses: BrandAnalysisDoc[];
  onSelectProject: (analysis: BrandAnalysisDoc) => void;
  onReset: () => void;
  loading: boolean;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ analyses, onReset, loading }) => {
  const navigate = useNavigate();

  const handleSelect = (analysis: BrandAnalysisDoc) => {
    navigate(`/studio/${analysis.id}`);
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 min-h-[80vh] flex flex-col">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center min-h-screen">
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] brand-bg-primary rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] brand-text-primary">MA COLLECTION</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-brand font-bold text-slate-900 tracking-tighter leading-none">
            Brand <br className="md:hidden"/> <span className="italic text-slate-400">Archiv.</span>
          </h1>
        </div>
        
        <button 
          onClick={() => { onReset(); navigate('/studio'); }}
          className="group relative flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-bold text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] hover:shadow-2xl overflow-hidden active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative flex items-center gap-3">
             Nouveau Studio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          </span>
        </button>
      </div>

      {analyses.length === 0 ? (
        <div className="w-full py-32 flex flex-col items-center text-center space-y-8 bg-slate-50/50 rounded-[4rem] border border-dashed border-slate-200">
          <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-sm border border-slate-100">
             <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-brand font-bold text-slate-900">Aucun projet trouvé</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto font-medium">Commencez par importer un logo pour créer votre première identité visuelle.</p>
          </div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {analyses.map((analysis) => (
            <div 
              key={analysis.id || Math.random().toString()}
              onClick={() => handleSelect(analysis)}
              className="group relative bg-white border border-slate-100 rounded-[3rem] p-8 transition-all hover:border-slate-900 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden flex flex-col"
            >
              <div className="flex-1 space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center p-3 group-hover:bg-slate-900 transition-colors">
                      <img src={analysis.logoUrl} className="w-full h-full object-contain group-hover:invert transition-all" alt="" />
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase">
                      {analysis.createdAt?.seconds ? new Date(analysis.createdAt.seconds * 1000).toLocaleDateString() : 'Récemment'}
                    </span>
                 </div>

                 <div className="space-y-2">
                    <h3 className="text-3xl font-brand font-bold text-slate-900 tracking-tighter leading-none group-hover:translate-x-1 transition-transform">
                      {analysis.brandIdentity?.companyName || "Studio sans titre"}
                    </h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full brand-bg-primary"></span>
                      {analysis.category || 'Marque'}
                    </p>
                 </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Voir le studio</span>
                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
