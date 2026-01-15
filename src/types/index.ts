
export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Typography {
  heading: string;
  body: string;
}

export interface VisualAssets {
  logoLight: string;
  logoDark: string;
  colorPalette: string;
  businessCard: string;
  socialTemplate: string;
  brandPattern: string;
}

export interface GeneratedImages {
  logoLight?: string;
  logoDark?: string;
  colorPalette?: string;
  businessCard?: string;
  socialTemplate?: string;
  brandPattern?: string;
}

export interface BrandIdentity {
  brandColors: BrandColors;
  typography: Typography;
  brandVoice: string[];
  visualStyle: string;
  visualAssets: VisualAssets;
}

export type AppStatus = 'idle' | 'analyzing' | 'generating' | 'completed' | 'error';

export interface BrandAnalysisDoc {
  id?: string;
  userId: string;
  logoUrl: string;
  brandIdentity: BrandIdentity;
  generatedImages: GeneratedImages;
  createdAt: any; // Firestore Timestamp
  category?: string;
  progress?: number;
}
