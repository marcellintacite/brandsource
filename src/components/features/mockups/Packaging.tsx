import React from 'react';
import { BrandColors } from '../../../types';

interface PackagingProps {
  colors: BrandColors;
  logoUrl: string | null;
  brandName: string;
}

const Packaging: React.FC<PackagingProps> = ({ colors, logoUrl, brandName }) => {
  return (
    <div className="w-full aspect-square bg-slate-50 flex flex-col items-center justify-center p-8 gap-12 perspective-2000 group">
      {/* 3D Box Mockup */}
      <div className="w-64 h-64 relative transform-style-3d rotate-x-12 rotate-y-12 transition-transform duration-700 group-hover:rotate-y-45 group-hover:rotate-x-6">
        
        {/* Front Face */}
        <div className="absolute inset-0 transform translate-z-32 bg-white rounded-sm shadow-lg flex flex-col items-center justify-center border border-slate-100 overflow-hidden"
             style={{ backgroundColor: colors.primary }}>
             
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10 mix-blend-overlay"></div>
             
             <div className="relative z-10 p-8 flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-2xl p-4 shadow-xl flex items-center justify-center">
                   {logoUrl && <img src={logoUrl} className="w-full h-full object-contain" alt="Logo" />}
                </div>
                <h3 className="text-white font-brand font-bold text-lg tracking-tight">{brandName}</h3>
                <div className="w-12 h-1 bg-white/30 rounded-full"></div>
             </div>
             
             <div className="absolute bottom-0 w-full h-1/4 bg-black/20 backdrop-blur-sm"></div>
        </div>
        
        {/* Top Face (Lid) */}
        <div className="absolute inset-0 h-32 origin-bottom transform -translate-y-32 rotate-x-90 bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
             <div className="opacity-10 scale-150 transform rotate-45">
                 {logoUrl && <img src={logoUrl} className="w-32 h-32 object-contain grayscale" alt="Logo" />}
             </div>
        </div>
        
        {/* Right Face */}
        <div className="absolute inset-0 w-32 origin-left transform translate-x-64 rotate-y-90 bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
            <div className="rotate-90 text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 whitespace-nowrap">
                Premium Edition
            </div>
             <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent"></div>
        </div>
        
         {/* Shadow */}
         <div className="absolute -bottom-12 left-0 w-full h-12 bg-black/20 blur-xl rounded-full transform scale-x-75 translate-z-[-50px]"></div>

      </div>
    </div>
  );
};

export default Packaging;
