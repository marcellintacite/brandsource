import React from 'react';
import { BrandColors } from '../../../types';

interface SpeakerTemplateProps {
  colors: BrandColors;
  logoUrl: string | null;
  brandName: string;
}

const SpeakerTemplate: React.FC<SpeakerTemplateProps> = ({ colors, logoUrl, brandName }) => {
  return (
    <div className="w-full aspect-square bg-slate-900 flex flex-col items-center justify-center p-8 relative overflow-hidden group">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none blur-3xl rounded-full" style={{ backgroundColor: colors.primary }}></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10 pointer-events-none blur-2xl rounded-full" style={{ backgroundColor: colors.secondary }}></div>
      
      {/* Main Content Area */}
      <div className="w-full h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col justify-between z-10 transition-transform duration-500 group-hover:scale-[1.02]">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div className="w-12 h-1 rounded-full" style={{ backgroundColor: colors.accent }}></div>
            <h4 className="text-white text-2xl font-brand font-bold leading-tight">
              L'avenir du <br />
              <span style={{ color: colors.secondary }}>Design Digital</span>
            </h4>
          </div>
          {logoUrl && <img src={logoUrl} className="h-6 object-contain brightness-0 invert opacity-80" alt="Logo" />}
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-slate-800 flex items-center justify-center text-white/50 overflow-hidden">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div>
            <p className="text-white text-sm font-bold">Jean-Marc Tremblay</p>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Conférencier Principal</p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[8px] font-bold text-white/30 uppercase tracking-[0.2em]">
          <span>© 2026 {brandName}</span>
          <span style={{ color: colors.secondary }}>Masterclass Series</span>
        </div>
      </div>

      {/* Modern abstract pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(${colors.primary} 1px, transparent 0)`, backgroundSize: '24px 24px' }}></div>
    </div>
  );
};

export default SpeakerTemplate;
