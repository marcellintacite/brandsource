import React from 'react';
import { BrandColors, Typography } from '../../../types';

interface EventFlyerProps {
  colors: BrandColors;
  typography: Typography;
  logoUrl: string | null;
  tagline: string;
}

const EventFlyer: React.FC<EventFlyerProps> = ({ colors, typography, logoUrl, tagline }) => {
  return (
    <div className="w-full aspect-square bg-slate-50 flex flex-col items-center justify-center p-6 gap-6 perspective-1000 group">
      {/* Stationery / Invoice Mockup (Inspired by Image 0) */}
      <div className="w-full aspect-[1/1.4] bg-white rounded shadow-[0_30px_60px_rgba(0,0,0,0.12)] p-10 flex flex-col relative overflow-hidden transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.18)] border border-slate-100">
        
        {/* Geometric Triangular Cluster (Top Right - Matching middle image of Image 0) */}
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none overflow-hidden opacity-90">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50,0 L100,50 L100,0 Z" fill={colors.primary} />
            <path d="M50,0 L75,25 L25,25 Z" fill={colors.secondary} fillOpacity="0.8" />
            <path d="M75,25 L100,50 L75,75 Z" fill={colors.primary} fillOpacity="0.6" />
            <path d="M100,50 L100,100 L50,100 Z" fill={colors.primary} fillOpacity="0.4" />
          </svg>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-16 relative z-10">
          <div className="space-y-1">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Invoice To:</p>
             <p className="text-xs font-bold text-slate-900">John Doe</p>
             <p className="text-[9px] text-slate-400">Managing Director, XYZ Ltd.</p>
          </div>
          <div className="text-right flex flex-col items-end">
            {logoUrl && <img src={logoUrl} className="h-8 object-contain mb-2" alt="Logo" />}
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Stationery No.</p>
            <p className="text-[10px] font-bold">#S-2026-001</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative z-10">
          <div className="w-full h-[1px] bg-slate-100 mb-8"></div>
          
          <div className="mb-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: colors.primary }}>Description de l'Article</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-slate-50/50 border border-slate-100 border-l-4" style={{ borderLeftColor: colors.primary }}>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-slate-900">Direction Artistique & Identité</p>
                  <p className="text-[9px] text-slate-400">Conception complète de la charte graphique</p>
                </div>
                <p className="text-[11px] font-bold text-slate-900">$2,400.00</p>
              </div>
              <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-slate-50/50 border border-slate-100 border-l-4" style={{ borderLeftColor: colors.secondary }}>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-slate-900">Développement Stratégique</p>
                  <p className="text-[9px] text-slate-400">Analyse de marché et positionnement</p>
                </div>
                <p className="text-[11px] font-bold text-slate-900">$1,800.00</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl text-white space-y-2 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-12 -translate-y-12"></div>
             <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">Signature Brand DNA</p>
             <p className="text-sm font-brand leading-relaxed italic" style={{ fontFamily: typography.body }}>
               "{tagline}"
             </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-end relative z-10">
          <div className="space-y-2">
            <div className="flex gap-1">
               <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.primary }}></div>
               <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.secondary }}></div>
               <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.accent }}></div>
            </div>
            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 leading-none">© 2026 BRD STUDIO</p>
          </div>
          <div className="text-right">
             <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Total</p>
             <p className="text-xl font-brand font-bold text-slate-900 tracking-tighter">$4,200.00</p>
          </div>
        </div>

        {/* Background Watermark (Left side of Image 0) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none scale-[2]">
          {logoUrl && <img src={logoUrl} className="w-96 h-96 object-contain" alt="" />}
        </div>
      </div>
    </div>
  );
};

export default EventFlyer;
