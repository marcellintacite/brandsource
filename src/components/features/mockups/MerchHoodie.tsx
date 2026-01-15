import React from 'react';
import { BrandColors } from '../../../types';

interface MerchHoodieProps {
  colors: BrandColors;
  logoUrl: string | null;
}

const MerchHoodie: React.FC<MerchHoodieProps> = ({ colors, logoUrl }) => {
  return (
    <div className="w-full aspect-square bg-slate-100 flex items-center justify-center p-12 overflow-hidden">
      <div className="w-full h-full bg-slate-900 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col items-center justify-center transform transition-all hover:scale-[1.05] duration-700">
        {/* Fabric texture overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')]"></div>
        
        {/* Abstract "Hoodie" folds via gradients */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/20 to-transparent"></div>
        
        {/* Drawstrings (Abstract) */}
        <div className="absolute top-12 flex gap-12">
           <div className="w-1.5 h-32 rounded-full border border-white/10" style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary})` }}></div>
           <div className="w-1.5 h-32 rounded-full border border-white/10" style={{ background: `linear-gradient(to bottom, transparent, ${colors.secondary})` }}></div>
        </div>

        {/* Branding on Chest */}
        <div className="relative z-10 p-10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl transform -rotate-1">
           <div className="absolute inset-0 bg-white/5 opacity-50 blur-xl"></div>
           {logoUrl && <img src={logoUrl} className="h-16 object-contain relative z-10 brightness-0 invert opacity-90" alt="Logo" />}
        </div>
        
        {/* Label Peek */}
        <div className="absolute bottom-16 flex flex-col items-center gap-2 opacity-40">
           <div className="px-3 py-1 bg-white/10 rounded-md border border-white/10 text-[8px] font-bold text-white uppercase tracking-[0.4em]">Essential Merch</div>
           <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
           </div>
        </div>

        {/* Production Stamp */}
        <div className="absolute top-10 right-10 flex flex-col items-end opacity-20">
           <p className="text-[10px] font-black text-white uppercase tracking-[0.5em] leading-none mb-1">PRD-MLXX</p>
           <div className="w-12 h-0.5 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MerchHoodie;
