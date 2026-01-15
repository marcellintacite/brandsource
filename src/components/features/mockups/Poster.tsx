import React from 'react';
import { BrandColors, Typography } from '../../../types';

interface PosterProps {
  colors: BrandColors;
  typography: Typography;
  logoUrl: string | null;
  tagline: string;
}

const Poster: React.FC<PosterProps> = ({ colors, typography, logoUrl, tagline }) => {
  return (
    <div className="w-full aspect-square bg-slate-100 flex items-center justify-center p-8 overflow-hidden group">
      <div className="w-[85%] aspect-[1/1.41] bg-white shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative flex flex-col p-12 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_70px_140px_rgba(0,0,0,0.15)] group-hover:-translate-y-2 group-hover:rotate-1">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        
        {/* Swiss Design Elements */}
        <div className="absolute top-12 right-12 flex flex-col items-end space-y-2">
           <div className="w-12 h-1 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Edition 2026</p>
        </div>

        <div className="mb-20">
          {logoUrl && <img src={logoUrl} className="h-12 object-contain grayscale opacity-90" alt="Logo" />}
        </div>
        
        <div className="flex-1 flex flex-col justify-start">
          <h4 className="text-6xl font-brand font-bold leading-[0.85] tracking-tighter uppercase text-slate-900 mb-8" style={{ fontFamily: typography.heading }}>
            {tagline.split(' ').slice(0, 2).join('\n')} <br/>
            <span style={{ color: colors.primary }}>{tagline.split(' ').slice(2).join(' ')}</span>
          </h4>
          
          <div className="mt-8 space-y-6">
             <div className="w-24 h-[1px] bg-slate-200"></div>
             <p className="text-slate-500 text-[10px] leading-relaxed max-w-[70%] font-medium">
               An exploration of modern brand identity system. Designed for clarity, impact and timeless aesthetic.
             </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-auto pt-10 border-t border-slate-100 flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Vertical Studio</p>
            <p className="text-sm font-bold text-slate-900">Typeface: {typography.heading}</p>
          </div>
          <div className="flex flex-col items-end gap-3">
             <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-lg" style={{ backgroundColor: colors.primary }}>
               26
             </div>
          </div>
        </div>

        {/* Ink bleed effect on edges */}
        <div className="absolute inset-x-0 top-0 h-1 opacity-10 bg-gradient-to-b from-slate-200 to-transparent"></div>
      </div>
    </div>
  );
};

export default Poster;
