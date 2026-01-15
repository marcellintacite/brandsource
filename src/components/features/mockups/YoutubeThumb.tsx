import React from 'react';
import { BrandColors } from '../../../types';

interface YoutubeThumbProps {
  colors: BrandColors;
  logoUrl: string | null;
  tagline: string;
}

const YoutubeThumb: React.FC<YoutubeThumbProps> = ({ colors, logoUrl, tagline }) => {
  return (
    <div className="w-full aspect-[16/9] relative flex items-center justify-center bg-slate-100 group overflow-hidden">
      {/* Background with Brand Colors Gradient */}
      <div 
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
        style={{ 
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }}></div>
      </div>

      {/* Glassmorphic Overlay Content */}
      <div className="relative z-10 w-[90%] h-[80%] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl">
        <div className="flex justify-between items-start">
          <div className="w-16 h-16 bg-white rounded-2xl p-3 shadow-lg flex items-center justify-center">
            {logoUrl ? (
              <img src={logoUrl} className="w-full h-full object-contain" alt="Logo" />
            ) : (
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            )}
          </div>
          <div className="px-4 py-2 bg-red-600 text-white font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center gap-2 shadow-lg animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            En Direct
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-3xl md:text-4xl font-brand font-bold text-white tracking-tighter leading-tight drop-shadow-lg max-w-[80%]">
            {tagline}
          </h4>
          <div className="flex items-center gap-4">
            <div className="h-0.5 w-12 bg-white/40"></div>
            <p className="text-[10px] font-bold text-white/80 uppercase tracking-[0.3em]">Masterclass Exclusive</p>
          </div>
        </div>

        {/* Play Button Icon */}
        <div className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Abstract Design Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 border-4 border-white/5 rounded-full"></div>
      <div className="absolute bottom-[-20%] left-[-5%] w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default YoutubeThumb;
