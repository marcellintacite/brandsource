import React from 'react';
import { BrandColors } from '../../../types';

interface SocialPostProps {
  colors: BrandColors;
  logoUrl: string | null;
  tagline: string;
}

const SocialPost: React.FC<SocialPostProps> = ({ colors, logoUrl, tagline }) => {
  return (
    <div className="w-full aspect-square relative flex items-center justify-center p-6 bg-slate-50 group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-gradient-to-br from-slate-200 to-transparent rounded-full blur-2xl"></div>
      
      <div className="w-full aspect-square bg-white rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] flex flex-col relative z-20 overflow-hidden border border-slate-100/50 transition-all duration-700 group-hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]">
        {/* Profile Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-50 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-100 shadow-sm overflow-hidden bg-slate-50 ring-2 ring-slate-50">
               {logoUrl ? <img src={logoUrl} className="w-5 h-5 object-contain" alt="Logo" /> : <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-900 leading-tight">BrandSource Official</span>
              <span className="text-[8px] font-medium text-slate-400">Speaker Series 2026</span>
            </div>
          </div>
          <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </div>

        {/* Speaker Announcement Content */}
        <div className="flex-1 relative flex flex-col items-center justify-center p-8 overflow-hidden text-center">
          {/* Circular Speaker Profile (Placeholder/Abstract) */}
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10 bg-slate-100 group-hover:scale-105 transition-transform duration-700">
               {/* Abstract pattern to simulate personality/brand vibe */}
               <div className="absolute inset-0 opacity-40" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <svg className="w-16 h-16 text-white/50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
               </div>
               {logoUrl && <img src={logoUrl} className="absolute bottom-2 right-2 w-8 h-8 p-1.5 bg-white rounded-full shadow-lg object-contain border border-slate-100" alt="Brand Logo" />}
            </div>
            {/* Halo effect */}
            <div className="absolute inset-0 rounded-full scale-125 opacity-20 blur-2xl" style={{ backgroundColor: colors.primary }}></div>
          </div>

          <div className="space-y-4 relative z-20">
             <div className="flex flex-col items-center gap-1">
               <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: colors.secondary }}>Annonce Conférencier</span>
               <div className="w-12 h-1 rounded-full" style={{ backgroundColor: colors.accent }}></div>
             </div>
             
             <div className="space-y-1">
               <h4 className="text-2xl font-brand font-bold text-slate-900 tracking-tight leading-[1.1] max-w-[240px]">
                 {tagline}
               </h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">En Direct sur Zoom • 20h00</p>
             </div>
          </div>
          
          {/* Elegant geometric pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `radial-gradient(${colors.primary} 2px, transparent 2px)`, backgroundSize: '24px 24px' }}></div>
        </div>

        {/* Post Metadata/Interactions */}
        <div className="p-4 bg-white border-t border-slate-50 flex items-center justify-between">
           <div className="flex gap-4">
              <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
           </div>
           <div className="px-6 py-2 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: colors.primary }}>
             S'inscrire
           </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPost;
