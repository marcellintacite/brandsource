import React from 'react';
import { BrandColors } from '../../../types';

interface SignageProps {
  colors: BrandColors;
  logoUrl: string | null;
  brandName: string;
}

const Signage: React.FC<SignageProps> = ({ colors, logoUrl, brandName }) => {
  return (
    <div className="w-full aspect-square bg-white flex items-center justify-center p-12 relative overflow-hidden">
      {/* Wall texture / context */}
      <div className="absolute inset-0 bg-slate-50 opacity-50"></div>
      
      {/* Signage Plate */}
      <div className="w-full h-56 bg-white border border-slate-200 rounded-xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1),0_18px_36px_-18px_rgba(0,0,0,0.15)] flex items-center px-12 gap-10 relative overflow-hidden group">
        {/* Material Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]"></div>
        
        {/* Left Color Bar */}
        <div className="absolute inset-y-0 left-0 w-3 shadow-lg" style={{ backgroundColor: colors.primary }}></div>
        
        {/* Logo Container */}
        <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center p-4 border border-slate-100 group-hover:scale-105 transition-transform duration-500">
          {logoUrl && <img src={logoUrl} className="w-full h-full object-contain" alt="Logo" />}
        </div>
        
        <div className="h-20 w-px bg-slate-200"></div>
        
        <div className="flex flex-col justify-center">
            <h4 className="text-3xl font-brand font-bold text-slate-900 tracking-tighter uppercase leading-none mb-2">
                STUDIO <span style={{ color: colors.primary }}>{brandName}</span>
            </h4>
            <div className="flex items-center gap-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Niveau 04</p>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Espace 12B</p>
            </div>
        </div>

        {/* Screw heads like a real plaque */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-slate-300 shadow-inner"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-slate-300 shadow-inner"></div>
      </div>
    </div>
  );
};

export default Signage;
