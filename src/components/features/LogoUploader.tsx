import React, { useState } from 'react';

interface LogoUploaderProps {
  onImageSelected: (base64: string, category: string) => void;
  disabled: boolean;
}

const CATEGORIES = [
  'Technologie & Logiciels',
  'Musique & Divertissement',
  'Alimentation & Boisson',
  'Mode & Luxe',
  'Santé & Bien-être',
  'Sport & Lifestyle',
  'Immobilier & Architecture',
  'Éducation & Coaching',
  'Art & Design',
  'Autre'
];

const LogoUploader: React.FC<LogoUploaderProps> = ({ onImageSelected, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]);

  const processFile = (file: File) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && validTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => onImageSelected(reader.result as string, category);
      reader.readAsDataURL(file);
    } else {
      alert("Veuillez importer uniquement des fichiers PNG ou JPG.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="w-full max-w-2xl space-y-10">
      {/* Category Selection */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Étape 01 : Secteur d'Activité</label>
        <div className="relative">
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={disabled}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Étape 02 : Importation de l'ADN</label>
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative p-12 border-2 border-dashed rounded-[2.5rem] bg-white shadow-xl transition-all cursor-pointer group active:scale-[0.98]
            ${isDragging ? 'border-orange-500 bg-orange-50/30 scale-[1.01]' : 'border-slate-100 hover:border-orange-400'} 
            ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
            <div className="flex flex-col items-center justify-center py-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 
                ${isDragging ? 'bg-orange-500 text-white scale-110' : 'bg-orange-50 text-orange-500 group-hover:scale-110'}`}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {isDragging ? 'Relâchez pour Analyser' : 'Importez votre Logo'}
              </h3>
              <p className="text-slate-400 text-[11px] font-medium text-center max-w-[240px]">
                {isDragging ? 'On s\'occupe du reste...' : 'Glissez-déposez votre fichier ici pour générer votre studio de marque.'}
              </p>
            </div>
            <input type="file" className="hidden" accept=".png,.jpg,.jpeg,image/png,image/jpeg" onChange={handleFileChange} disabled={disabled} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default LogoUploader;
