
import React, { useState } from 'react';
import { BrandIdentity, GeneratedImages } from '../../types';
import BusinessCard from './mockups/BusinessCard';
import SocialPost from './mockups/SocialPost';
import Poster from './mockups/Poster';
import Signage from './mockups/Signage';
import WebHero from './mockups/WebHero';
import MerchHoodie from './mockups/MerchHoodie';
import SpeakerTemplate from './mockups/SpeakerTemplate';
import EventFlyer from './mockups/EventFlyer';
import YoutubeThumb from './mockups/YoutubeThumb';
import Packaging from './mockups/Packaging';
import Apparel from './mockups/Apparel';
import Stationery from './mockups/Stationery';

interface BrandDashboardProps {
  identity: BrandIdentity;
  images: GeneratedImages;
  logoUrl: string | null;
}

type MockupType = 'card' | 'social' | 'poster' | 'sign' | 'web' | 'merch' | 'speaker' | 'flyer' | 'youtube' | 'packaging' | 'apparel' | 'stationery';

const BrandDashboard: React.FC<BrandDashboardProps> = ({ identity, images, logoUrl }) => {
  const { brandColors, brandVoice, typography } = identity;
  const [selectedAsset, setSelectedAsset] = useState<{ type: 'image' | MockupType, url?: string, title: string } | null>(null);

  // Apply dynamic theme
  React.useEffect(() => {
    document.documentElement.style.setProperty('--brand-primary', brandColors.primary);
    document.documentElement.style.setProperty('--brand-secondary', brandColors.secondary);
  }, [brandColors]);

  const handleExport = () => {
    const brandData = {
      branding: {
        colors: brandColors,
        typography: typography,
        voice: brandVoice
      },
      assets: images,
      metadata: {
        exportedAt: new Date().toISOString(),
        version: "1.0",
        engine: "BrandSource AI Studio"
      }
    };
    
    const blob = new Blob([JSON.stringify(brandData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `brandkit-${brandVoice[0].toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const CardWrapper = ({ title, subtitle, children, onClick, className = "" }: any) => (
    <div className={`group flex flex-col gap-5 cursor-pointer active:scale-95 transition-all duration-300 ${className}`} onClick={onClick}>
      <div className="w-full relative overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] hover:-translate-y-2 bg-white">
        {children}
        <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <div className="bg-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              Explorer l'Asset
            </div>
        </div>
      </div>
      <div className="px-2">
        <h3 className="font-bold text-slate-900 text-base tracking-tight mb-1">{title}</h3>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{subtitle}</p>
      </div>
    </div>
  );

  const renderMockup = (type: MockupType, isModal = false) => {
    switch (type) {
      case 'card':
        return <BusinessCard colors={brandColors} logoUrl={logoUrl} brandName={brandVoice[0]} />;
      case 'social':
        return <SocialPost colors={brandColors} logoUrl={logoUrl} tagline={brandVoice[1] || brandVoice[0]} />;
      case 'poster':
        return <Poster colors={brandColors} typography={typography} logoUrl={logoUrl} tagline={brandVoice[1] || brandVoice[0]} />;
      case 'sign':
        return <Signage colors={brandColors} logoUrl={logoUrl} brandName={brandVoice[0]} />;
      case 'web':
        return <WebHero colors={brandColors} logoUrl={logoUrl} brandName={brandVoice[0]} />;
      case 'merch':
        return <MerchHoodie colors={brandColors} logoUrl={logoUrl} />;
      case 'speaker':
        return <SpeakerTemplate colors={brandColors} logoUrl={logoUrl} brandName={brandVoice[0]} />;
      case 'flyer':
        return <EventFlyer colors={brandColors} typography={typography} logoUrl={logoUrl} tagline={brandVoice[1] || brandVoice[0]} />;
      case 'youtube':
        return <YoutubeThumb colors={brandColors} logoUrl={logoUrl} tagline={brandVoice[1] || brandVoice[0]} />;
      case 'packaging':
        return <Packaging colors={brandColors} logoUrl={logoUrl} brandName={brandVoice[0]} />;
      case 'apparel':
        return <Apparel colors={brandColors} logoUrl={logoUrl} brandName={brandVoice[0]} />;
      case 'stationery':
        return <Stationery colors={brandColors} logoUrl={logoUrl} brandName={brandVoice[0]} />;
      default:
        return null;
    }
  };

  const handlePrintDocument = () => {
    window.print();
  };

  const Modal = () => {
    if (!selectedAsset) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center animate-in fade-in duration-300">
        <div 
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-500" 
          onClick={() => setSelectedAsset(null)}
        ></div>
        
        {/* Responsive Container */}
        <div className="relative w-full md:max-w-6xl md:max-h-[90vh] flex flex-col items-center justify-end md:justify-center p-0 md:p-6 pointer-events-none h-full md:h-auto">
          <div className="relative w-full md:w-auto bg-white rounded-t-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in slide-in-from-bottom-full md:slide-in-from-bottom-10 duration-500 ease-out pointer-events-auto max-h-[95vh] md:max-h-full">
            
            {/* Close Button - More visible and responsive */}
            <button 
              className="absolute top-6 right-6 z-[110] p-3 bg-white/90 md:bg-white hover:bg-slate-100 text-slate-900 rounded-full transition-all active:scale-95 shadow-xl border border-slate-100"
              onClick={() => setSelectedAsset(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            {/* Preview Section */}
            <div className="flex-[1.2] bg-slate-100 flex items-center justify-center p-6 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-slate-100 overflow-hidden shrink-0">
               <div className="w-full max-w-xl md:max-w-2xl drop-shadow-2xl">
                 {selectedAsset.type === 'image' ? (
                    <img src={selectedAsset.url} alt={selectedAsset.title} className="w-full h-auto max-h-[50vh] md:max-h-full object-contain rounded-2xl md:rounded-3xl shadow-lg" />
                 ) : (
                    <div className="w-full shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden scale-[0.8] sm:scale-100">
                      {renderMockup(selectedAsset.type as MockupType, true)}
                    </div>
                 )}
               </div>
            </div>
            
            {/* Details Section */}
            <div className="flex-1 p-8 md:p-12 lg:p-20 flex flex-col overflow-y-auto min-h-0 bg-white">
              <div className="mb-8 md:mb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: brandColors.primary }}>Spécifications</p>
                <h4 className="text-3xl md:text-5xl font-brand font-bold tracking-tighter text-slate-900 leading-tight">{selectedAsset.title}</h4>
              </div>
              
              <div className="space-y-8 flex-1">
                <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-medium">
                  {selectedAsset.type === 'image' 
                    ? `Inspiration lifestyle générée par Gemini. Cette scène illustre comment votre marque s'intègre naturellement dans un environnement professionnel haut de gamme.` 
                    : `Maquette haute fidélité modélisée en CSS. Ce support permet de valider la cohérence visuelle de votre nouvelle identité sur des points de contact réels.`
                  }
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Version</p>
                      <p className="text-xs font-bold text-slate-900">1.0 Production</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Qualité</p>
                      <p className="text-xs font-bold text-slate-900 uppercase">Premium HD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl space-y-32 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <Modal />
      
      {/* Brand Identity Header & Export Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 px-6 mb-16">
        <div className="space-y-2">
           <div className="flex items-center gap-3">
             <span className="w-10 h-[2px] rounded-full" style={{ backgroundColor: brandColors.primary }}></span>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Génération Complétée</p>
           </div>
           <h1 className="text-6xl md:text-8xl font-brand font-bold tracking-tighter text-slate-900">
             Studio <span className="italic text-slate-300">Brand.</span>
           </h1>
        </div>

        <button 
          onClick={handlePrintDocument}
          className="group relative flex items-center gap-4 px-10 py-6 bg-slate-900 text-white rounded-[2rem] font-bold text-xs uppercase tracking-[0.2em] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative flex items-center gap-3">
             Exporter Mon Guide
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 00-2 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          </span>
        </button>
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-8 bg-white p-12 lg:p-16 rounded-[4rem] shadow-[0_30px_70px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex items-center justify-between mb-16 relative z-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-3 brand-text-primary opacity-60">Section 01</p>
              <h2 className="text-5xl font-brand font-bold tracking-tighter">Architecture Chromatique</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 relative z-10">
            {[
              { id: 'Pri', hex: brandColors.primary, label: 'Primaire' },
              { id: 'Sec', hex: brandColors.secondary, label: 'Secondaire' },
              { id: 'Acc', hex: brandColors.accent, label: 'Accent' },
              { id: 'Bg', hex: brandColors.background, label: 'Fond' },
              { id: 'Txt', hex: brandColors.text, label: 'Texte' },
            ].map(c => (
              <div key={c.id} className="space-y-5 group active:scale-95 transition-transform">
                <div className="w-full aspect-[4/5] rounded-[2rem] shadow-2xl overflow-hidden relative transition-transform duration-500 group-hover:scale-[1.05]">
                  <div className="absolute inset-0" style={{ backgroundColor: c.hex }}></div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{c.label}</p>
                  <p className="text-sm font-mono font-bold text-slate-900 uppercase">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-16 border-t border-slate-50 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 text-slate-400">Combinaisons & Accessibilité</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { bg: brandColors.primary, label: 'Primaire' },
                { bg: brandColors.secondary, label: 'Secondaire' },
                { bg: brandColors.text, label: 'Sombre' },
              ].map((combo, i) => {
                const getLuminance = (hex: string) => {
                  const r = parseInt(hex.slice(1, 3), 16);
                  const g = parseInt(hex.slice(3, 5), 16);
                  const b = parseInt(hex.slice(5, 7), 16);
                  return (r * 0.299 + g * 0.587 + b * 0.114);
                };
                const isDark = getLuminance(combo.bg) < 160;
                const txtColor = isDark ? '#ffffff' : '#0f172a';
                return (
                  <div 
                    key={i} 
                    className="p-10 rounded-[2.5rem] space-y-4 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1" 
                    style={{ backgroundColor: combo.bg, color: txtColor }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{combo.label}</p>
                    <p className="text-2xl font-brand font-bold leading-tight tracking-tight">Lisibilité & <br/>Contraste.</p>
                    <p className="text-xs opacity-80 leading-relaxed font-medium">Contraste optimisé pour une expérience utilisateur premium.</p>
                    <div className="pt-6 flex gap-3">
                       <div className="w-10 h-1 rounded-full opacity-30" style={{ backgroundColor: txtColor }}></div>
                       <div className="w-5 h-1 rounded-full opacity-30" style={{ backgroundColor: txtColor }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 brand-bg-primary p-12 lg:p-16 rounded-[4rem] shadow-2xl text-white flex flex-col justify-between relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-700">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[100px]"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-black/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-10 text-white/40">Section 02</p>
            <h3 className="text-3xl lg:text-4xl font-brand font-bold mb-10 tracking-tight leading-tight">Voix & <br/>Typographie</h3>
            <div className="space-y-4">
              {brandVoice.map((v, i) => (
                <div key={i} className="flex items-center gap-5 bg-white/10 p-5 rounded-2xl backdrop-blur-xl border border-white/10 transition-colors hover:bg-white/15">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColors.secondary }}></div>
                  <span className="text-lg font-bold capitalize tracking-tight">{v}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md relative z-10">
             <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-3">Signature Head</p>
             <p className="text-3xl font-brand font-bold leading-none mb-2">{typography.heading}</p>
             <p className="text-xs text-white/50 font-medium">Fallback: {typography.body}</p>
          </div>
        </div>
      </section>

      {/* Enhanced Production Mockups */}
      <section className="space-y-16">
        <div className="px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="brand-text-primary font-black uppercase tracking-[0.5em] text-[10px] opacity-60">Section 03</p>
              <h2 className="text-6xl font-brand font-bold tracking-tighter">Maquettes Écosystème</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-sm font-medium leading-relaxed">
              Exploration haute-fidélité de l'application de la marque sur des supports physiques et digitaux.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-2">
          
          <CardWrapper className="lg:col-span-2" title="Masterclass Speaker" subtitle="Web / Presentation" onClick={() => setSelectedAsset({type: 'speaker', title: 'Speaker Template'})}>
            {renderMockup('speaker')}
          </CardWrapper>

          <CardWrapper title="Affiche Officielle" subtitle="Print / Large Format" onClick={() => setSelectedAsset({type: 'poster', title: 'Affiche de Marque'})}>
            {renderMockup('poster')}
          </CardWrapper>

          <CardWrapper title="Social Strategy" subtitle="Instagram / Editorial" onClick={() => setSelectedAsset({type: 'social', title: 'Instagram Post'})}>
            {renderMockup('social')}
          </CardWrapper>

          <CardWrapper title="Papeterie & Facture" subtitle="Print / High-Spec" onClick={() => setSelectedAsset({type: 'flyer', title: 'Geometric Stationery'})}>
            {renderMockup('flyer')}
          </CardWrapper>

          <CardWrapper title="Corporate Identity" subtitle="Business / Stationnery" onClick={() => setSelectedAsset({type: 'card', title: 'Cartes de Visite'})}>
            {renderMockup('card')}
          </CardWrapper>

          <CardWrapper title="Video Presence" subtitle="YouTube / Digital" onClick={() => setSelectedAsset({type: 'youtube', title: 'YouTube Thumbnail'})}>
            {renderMockup('youtube')}
          </CardWrapper>

          <CardWrapper title="Product Packaging" subtitle="Retail / Experience" onClick={() => setSelectedAsset({type: 'packaging', title: 'Product Packaging'})}>
            {renderMockup('packaging')}
          </CardWrapper>

          <CardWrapper title="Apparel & Merch" subtitle="Fashion / Lifestyle" onClick={() => setSelectedAsset({type: 'apparel', title: 'Premium Apparel'})}>
            {renderMockup('apparel')}
          </CardWrapper>

          <CardWrapper title="Corporate Suite" subtitle="Office / Branding" onClick={() => setSelectedAsset({type: 'stationery', title: 'Stationery Set'})}>
            {renderMockup('stationery')}
          </CardWrapper>

        </div>
      </section>

      {/* AI Context Showcase */}
      <section className="space-y-12 px-4">
        <div>
            <p className="text-orange-600 font-black uppercase tracking-[0.4em] text-[10px] mb-2">Section 04</p>
            <h2 className="text-5xl font-brand font-bold tracking-tighter">Inspirations de Vie</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 'logoLight', label: 'Logo - Fond Clair', img: images.logoLight },
            { id: 'logoDark', label: 'Logo - Fond Sombre', img: images.logoDark },
            { id: 'colorPalette', label: 'Charte Chromatique', img: images.colorPalette },
            { id: 'businessCard', label: 'Carte de Visite', img: images.businessCard },
            { id: 'socialTemplate', label: 'Template Social', img: images.socialTemplate },
            { id: 'brandPattern', label: 'Motif de Marque', img: images.brandPattern },
            { id: 'packaging', label: 'Packaging', img: images.packaging },
            { id: 'apparel', label: 'Apparel', img: images.apparel },
            { id: 'stationery', label: 'Stationery', img: images.stationery },
          ].map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-50 transition-all hover:shadow-2xl cursor-pointer active:scale-95" onClick={() => item.img && setSelectedAsset({type: 'image', url: item.img, title: item.label})}>
              <div className="aspect-[16/10] bg-slate-100 rounded-3xl overflow-hidden relative">
                {item.img ? (
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full shimmer flex flex-col items-center justify-center gap-2">
                    <div className="w-6 h-6 rounded-full border-2 border-slate-200 border-t-orange-500 animate-spin"></div>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Studio Gemini...</p>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">{item.label}</h4>
                <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center">
                    <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default BrandDashboard;
