import React from 'react';
import { BrandColors } from '../../../types';

interface WebHeroProps {
  colors: BrandColors;
  logoUrl: string | null;
  brandName: string;
}

const WebHero: React.FC<WebHeroProps> = ({ colors, logoUrl, brandName }) => {
  return (
    <div className="w-full aspect-square bg-slate-50 p-6 flex items-center justify-center">
      <div className="w-full bg-white rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 flex flex-col h-full transform transition-transform hover:scale-[1.02] duration-500">
        {/* Browser Header */}
        <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20"></div>
        </div>
        
        {/* Navigation */}
        <nav className="px-8 py-5 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-50">
          {logoUrl && <img src={logoUrl} className="h-5 object-contain" alt="Logo" />}
          <div className="flex gap-6">
            <div className="w-12 h-1.5 bg-slate-100 rounded-full"></div>
            <div className="w-12 h-1.5 bg-slate-100 rounded-full"></div>
            <div className="hidden md:block w-12 h-1.5 bg-slate-100 rounded-full"></div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 p-12 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden">
          {/* Abstract background decor */}
          <div className="absolute -top-24 -right-24 w-64 h-64 opacity-10 rounded-full blur-3xl" style={{ backgroundColor: colors.primary }}></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 opacity-5 rounded-full blur-3xl" style={{ backgroundColor: colors.secondary }}></div>
          
          <span className="px-5 py-2 bg-slate-50 text-slate-400 rounded-full text-[8px] font-black uppercase tracking-[0.4em] border border-slate-100">Digital Experience</span>
          
          <h4 className="text-4xl md:text-5xl font-brand font-bold tracking-tighter uppercase leading-[0.9] max-w-lg" style={{ color: colors.text }}>
            Imaginez le futur de <span style={{ color: colors.primary }}>{brandName}</span>.
          </h4>
          
          <p className="text-slate-400 text-xs font-medium max-w-sm leading-relaxed">
            Une interface conçue pour la performance et l'élégance, respectant l'ADN de votre marque.
          </p>
          
          <div className="flex gap-4">
            <div className="px-8 py-4 rounded-xl text-[9px] font-bold text-white shadow-xl shadow-blue-200 uppercase tracking-widest" style={{ backgroundColor: colors.primary }}>
              Démarrer le projet
            </div>
            <div className="px-8 py-4 rounded-xl text-[9px] font-bold text-slate-400 border border-slate-200 uppercase tracking-widest bg-white">
              Savoir plus
            </div>
          </div>
        </div>

        {/* Footer Peek */}
        <div className="h-24 bg-slate-50 relative overflow-hidden">
           <div className="absolute bottom-0 right-0 w-full h-full opacity-5" style={{ backgroundColor: colors.primary, clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}></div>
        </div>
      </div>
    </div>
  );
};

export default WebHero;
