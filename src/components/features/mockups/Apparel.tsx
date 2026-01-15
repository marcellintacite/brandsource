import React from 'react';
import { BrandColors } from '../../../types';

interface ApparelProps {
  colors: BrandColors;
  logoUrl: string | null;
  brandName: string;
}

const Apparel: React.FC<ApparelProps> = ({ colors, logoUrl }) => {
  return (
    <div className="w-full aspect-square bg-slate-100 flex flex-col items-center justify-center p-8 gap-12 group overflow-hidden relative">
      <div className="absolute inset-0 bg-white opacity-50"></div>
      
      {/* T-Shirt Shape Simulation */}
      <div className="w-64 h-80 bg-white rounded-[3rem] shadow-2xl relative overflow-hidden transform transition-transform duration-700 group-hover:scale-105"
           style={{ backgroundColor: colors.primary }}>
        
        {/* Neckline */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-slate-100 rounded-b-full shadow-inner border-b-4 border-black/5"></div>
        
        {/* Sleeves hint */}
        <div className="absolute top-8 -left-8 w-16 h-32 bg-inherit rounded-r-3xl -rotate-12 brightness-90"></div>
        <div className="absolute top-8 -right-8 w-16 h-32 bg-inherit rounded-l-3xl rotate-12 brightness-90"></div>
        
        {/* Fabric Texture Effect */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] mix-blend-overlay"></div>
        
        {/* Lighting Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/10 pointer-events-none"></div>

        {/* Center Print Area */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 flex items-center justify-center">
            {logoUrl && (
                <div className="relative w-full h-full flex items-center justify-center filter drop-shadow-md">
                   <img src={logoUrl} className="w-full h-full object-contain brightness-0 invert opacity-90" alt="Apparel Print" />
                </div>
            )}
        </div>
        
        {/* User Tag */}
        <div className="absolute bottom-6 right-6">
            <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/20">
                <p className="text-[8px] font-black text-white uppercase tracking-widest">Premium Cotton</p>
            </div>
        </div>
      </div>
      
      {/* Label/Tag floating */}
      <div className="absolute top-12 right-12 bg-white px-4 py-3 rounded-lg shadow-xl -rotate-6 transform transition-transform group-hover:rotate-0 group-hover:scale-110">
          <div className="w-2 h-2 rounded-full bg-slate-200 mb-2"></div>
           <p className="text-[10px] font-bold text-slate-900">SIZE <span className="text-orange-500">L</span></p>
           <div className="w-12 h-1 bg-slate-100 mt-2 rounded-full"></div>
           <div className="w-8 h-1 bg-slate-100 mt-1 rounded-full"></div>
      </div>
    </div>
  );
};

export default Apparel;
