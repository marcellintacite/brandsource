import React from 'react';
import { BrandColors } from '../../../types';

interface StationeryProps {
  colors: BrandColors;
  logoUrl: string | null;
  brandName: string;
}

const Stationery: React.FC<StationeryProps> = ({ colors, logoUrl, brandName }) => {
  return (
    <div className="w-full aspect-square bg-slate-200 flex items-center justify-center p-8 relative overflow-hidden group">
      {/* Background shadow hint */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-slate-300"></div>
      
      {/* Letterhead */}
      <div className="w-48 h-64 bg-white shadow-2xl absolute left-12 top-12 transform -rotate-6 transition-transform duration-700 group-hover:-rotate-3 group-hover:scale-105 rounded-sm overflow-hidden border border-slate-50">
        <div className="h-24 w-full relative" style={{ backgroundColor: colors.primary }}>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center p-2">
                 {logoUrl && <img src={logoUrl} className="w-full h-full object-contain" alt="Logo" />}
            </div>
             <div className="absolute top-0 right-0 p-4 opacity-20">
                 <svg className="w-32 h-32 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/>
                 </svg>
             </div>
        </div>
        <div className="p-6 space-y-2">
            <div className="w-full h-1 bg-slate-100 rounded-full"></div>
            <div className="w-3/4 h-1 bg-slate-100 rounded-full"></div>
            <div className="w-5/6 h-1 bg-slate-100 rounded-full"></div>
            <div className="w-full h-1 bg-slate-100 rounded-full"></div>
            <div className="w-2/3 h-1 bg-slate-100 rounded-full"></div>
        </div>
         <div className="absolute bottom-6 right-6">
             <div className="w-16 h-8 border border-slate-200 flex items-center justify-center">
                 <p className="text-[6px] text-slate-300 uppercase">Signature</p>
             </div>
         </div>
      </div>
      
      {/* Envelope */}
      <div className="w-56 h-36 bg-slate-50 shadow-xl absolute right-12 bottom-20 transform rotate-12 transition-transform duration-700 group-hover:rotate-6 group-hover:translate-x-2 rounded-sm border border-slate-100 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: colors.secondary }}></div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
             <div className="flex items-center gap-2"> 
                {logoUrl && <img src={logoUrl} className="w-8 h-8 object-contain opacity-80" alt="Logo" />}
                <span className="font-brand font-bold text-slate-800 text-xs">{brandName}</span>
             </div>
             <p className="text-[8px] text-slate-400 font-mono">CONFIDENTIAL</p>
          </div>
          
          <div className="absolute bottom-4 right-4 w-12 h-16 bg-slate-100 border border-slate-200 shadow-sm flex items-center justify-center">
               <div className="w-8 h-10 border border-dotted border-slate-300"></div>
          </div>
      </div>
      
      {/* Business Card Floating */}
      <div className="absolute bottom-8 left-20 w-32 h-20 shadow-2xl transform -rotate-12 transition-transform duration-500 group-hover:rotate-0 rounded-lg overflow-hidden flex flex-col items-center justify-center"
           style={{ backgroundColor: colors.secondary }}>
           <h4 className="text-white font-black text-xs tracking-widest">{brandName.substring(0, 3).toUpperCase()}</h4>
           {logoUrl && <img src={logoUrl} className="w-8 h-8 object-contain mt-1 brightness-0 invert" alt="Logo" />}
      </div>

    </div>
  );
};

export default Stationery;
