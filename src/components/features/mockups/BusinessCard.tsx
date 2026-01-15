import React from 'react';
import { BrandColors } from '../../../types';

interface BusinessCardProps {
  colors: BrandColors;
  logoUrl: string | null;
  brandName: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ colors, logoUrl, brandName }) => {
  return (
    <div className="w-full aspect-square bg-slate-50 flex flex-col items-center justify-center p-8 gap-12 perspective-2000 group">
      {/* FRONT OF CARD (Inspired by bottom card of Image 1) */}
      <div className="w-full aspect-[1.58/1] bg-white rounded-xl shadow-[0_20px_50px_rgba(30,41,59,0.08)] p-8 flex flex-col justify-center border border-slate-100 transform transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-y-12 group-hover:-translate-y-2 relative overflow-hidden">
        {/* Wave background at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill={colors.primary} fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,154.7C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none opacity-40 translate-y-2">
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill={colors.secondary} fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,117.3C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="flex items-center gap-8 relative z-10 scale-90 md:scale-100">
          {/* Profile Photo Placeholder */}
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100 flex-shrink-0 relative group-hover:scale-110 transition-transform duration-500">
            <div className="absolute inset-0 flex items-center justify-center opacity-60">
              <svg className="w-16 h-16 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            {/* Subtle overlay to suggest diversity in placeholder */}
            <div className="absolute inset-0 bg-[#3d2c20] mix-blend-color opacity-20"></div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-brand font-bold text-slate-900 tracking-tight">John Doe</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-[1px] bg-slate-300"></span>
                Directeur Général
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-l-2 pl-4" style={{ borderLeftColor: colors.primary }}>
              <div className="flex items-center gap-2 text-[9px] text-slate-500 font-medium">
                <span className="w-3" style={{ color: colors.primary }}>📞</span>
                +33 (0) 6 12 34 56 78
              </div>
              <div className="flex items-center gap-2 text-[9px] text-slate-500 font-medium">
                <span className="w-3" style={{ color: colors.primary }}>✉️</span>
                contact@{brandName.toLowerCase().replace(/\s+/g, '')}.com
              </div>
              <div className="flex items-center gap-2 text-[9px] text-slate-500 font-medium">
                <span className="w-3" style={{ color: colors.primary }}>📍</span>
                Paris, France
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BACK OF CARD (Inspired by top card of Image 1) */}
      <div className="w-full aspect-[1.58/1] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center relative overflow-hidden transform transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-rotate-y-12 group-hover:translate-y-2" style={{ backgroundColor: colors.primary }}>
        {/* Wave pattern at bottom - brighter white waves */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="white" fillOpacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,154.7C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="white" fillOpacity="0.15" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,117.3C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-24 h-24 bg-white rounded-3xl p-5 shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700">
            {logoUrl && <img src={logoUrl} className="w-full h-full object-contain" alt="Logo" />}
          </div>
          <p className="text-white text-xs font-black uppercase tracking-[0.4em] opacity-80">{brandName}</p>
        </div>

        {/* Glossy overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default BusinessCard;
