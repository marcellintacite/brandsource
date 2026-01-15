import { GoogleGenAI, Type } from "@google/genai";
import { BrandIdentity } from "../types";

// Initialize Google GenAI with API key from environment
const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' 
});

// Schema for structured brand identity output with 9 exciting brand assets
const BRAND_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    brandColors: {
      type: Type.OBJECT,
      properties: {
        primary: { type: Type.STRING, description: 'The EXACT hex code of the PRIMARY brand color extracted from the logo.' },
        secondary: { type: Type.STRING, description: 'The EXACT hex code of the SECONDARY brand color extracted from the logo.' },
        accent: { type: Type.STRING, description: 'A vibrant contrast color that complements the logo colors.' },
        background: { type: Type.STRING, description: 'Neutral background color (light gray or white).' },
        text: { type: Type.STRING, description: 'Neutral dark text color for readability.' }
      },
      required: ['primary', 'secondary', 'accent', 'background', 'text'],
    },
    typography: {
      type: Type.OBJECT,
      properties: {
        heading: { type: Type.STRING, description: 'Professional heading font that matches brand personality.' },
        body: { type: Type.STRING, description: 'Clean, readable body font.' }
      },
      required: ['heading', 'body'],
    },
   brandVoice: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '3 professional brand adjectives that capture the brand essence.'
    },
    visualAssets: {
      type: Type.OBJECT,
      properties: {
        logoLight: { 
          type: Type.STRING, 
          description: 'PROMPT: Professional brand presentation on pristine white background. COMPOSITION: Center the logo prominently, occupying 40% of frame. STYLING: Add subtle drop shadow (0px 20px 40px rgba(0,0,0,0.08)). BORDER: Bold 4px border in [PRIMARY_COLOR] around entire frame with 40px padding - PRIMARY COLOR DOMINANT. LIGHTING: Soft top-down studio lighting. QUALITY: Ultra-sharp, minimal, editorial style. PRIMARY COLOR USAGE: 70% (border). NO text, NO patterns, ONLY logo and border.' 
        },
        logoDark: { 
          type: Type.STRING, 
          description: 'PROMPT: Premium dark mode brand showcase. BACKGROUND: Rich solid [PRIMARY_COLOR] covering 100% of background - PRIMARY COLOR DOMINANT. COMPOSITION: Logo centered, 35% of frame, pure white or light version, ensure maximum contrast. EFFECTS: Subtle radial glow behind logo using [SECONDARY_COLOR] at 10% opacity. LIGHTING: Dramatic rim lighting from top-right. ATMOSPHERE: Luxury, bold, sophisticated night-mode. PRIMARY COLOR USAGE: 100% (background). NO text overlays.' 
        },
        colorPalette: { 
          type: Type.STRING, 
          description: 'PROMPT: Professional color system documentation board. LAYOUT: 5 vertical color swatches in clean grid, equal spacing (20px gaps). SWATCHES: FIRST swatch is [PRIMARY_COLOR] - make it 50% LARGER than others to emphasize dominance. Each swatch 200x300px rectangle with exact colors [COLOR_1], [COLOR_2], [COLOR_3], [COLOR_4], [COLOR_5]. TYPOGRAPHY: Hex codes below each swatch in clean sans-serif (16px, medium weight). LOGO: Small 80px version in top-right corner. BACKGROUND: Light gray (#F8F9FA). STYLE: Flat design, Figma/Sketch style. PRIMARY COLOR USAGE: 35% (largest swatch).' 
        },
        businessCard: { 
          type: Type.STRING, 
          description: 'PROMPT: Elegant business card mockup, front and back views side-by-side. FRONT CARD: [PRIMARY_COLOR] solid background covering 60% of card (top section), logo in white/light (60px), name in white bold (18px), title below (12px), white background bottom 40%, contact info in [PRIMARY_COLOR]. BACK CARD: Full bleed [PRIMARY_COLOR] background 100% with white geometric pattern (5% opacity). MATERIAL: Premium matte finish. DIMENSIONS: Standard 3.5x2 inch. LIGHTING: Soft overhead with shadow. PRIMARY COLOR USAGE: 80% (front 60% + back 100% average). STYLE: Bold, minimalist, modern corporate.' 
        },
        socialTemplate: { 
          type: Type.STRING, 
          description: 'PROMPT: Modern Instagram post template, 1080x1080px square. LAYOUT: Logo in top-left (120px with 40px padding) in white/light. BACKGROUND: Bold [PRIMARY_COLOR] covering 75% of canvas - PRIMARY COLOR DOMINANT, [SECONDARY_COLOR] accent strip 25%. GEOMETRIC ELEMENTS: 2-3 abstract shapes in white at 10% opacity. TEXT AREA: Large white/light rectangle (600x400px) centered for copy. STYLE: Bold, contemporary, Instagram-ready, high contrast. PRIMARY COLOR USAGE: 75% (background). AESTHETIC: Premium social media template.' 
        },
        brandPattern: { 
          type: Type.STRING, 
          description: 'PROMPT: Seamless repeating brand pattern for backgrounds. ELEMENTS: Extract 2-3 geometric shapes from logo design. COLORS: [PRIMARY_COLOR] (65% - DOMINANT), [SECONDARY_COLOR] (25%), [ACCENT_COLOR] (10%). LAYOUT: Diagonal grid pattern, 45-degree angle, elements spaced 150px apart. OPACITY: [PRIMARY_COLOR] at 30-50%, others at 15-25%. SIZE: 1200x1200px tileable. PRIMARY COLOR USAGE: 65%. STYLE: Bold, sophisticated, luxury brand pattern.' 
        },
        packaging: {
          type: Type.STRING,
          description: 'PROMPT: Premium product packaging box mockup. DESIGN: Sleek rectangular box (300x200x100mm). COLORS: Top and sides in solid [PRIMARY_COLOR] (70% coverage) - PRIMARY COLOR DOMINANT, bottom panel in white. LOGO: Centered on top in white/light (100px), embossed effect. DETAILS: Minimalist typography, [SECONDARY_COLOR] accent line (2mm) around edges. MATERIAL: Matte finish with subtle texture. LIGHTING: Studio lighting with soft shadows. STYLE: Luxury unboxing experience, Apple-style minimalism. PRIMARY COLOR USAGE: 70%.'
        },
        apparel: {
          type: Type.STRING,
          description: 'PROMPT: Modern t-shirt or hoodie mockup on model or hanger. GARMENT: Premium quality fabric. DESIGN: Large logo print centered on chest (200mm width), [PRIMARY_COLOR] garment base - PRIMARY COLOR DOMINANT, logo in white/contrast color. BACKGROUND: Clean studio white or subtle [SECONDARY_COLOR] gradient. STYLE: Streetwear/athleisure aesthetic, contemporary fashion. DETAILS: High-quality screen print appearance. LIGHTING: Natural, lifestyle photography. PRIMARY COLOR USAGE: 80% (garment). AESTHETIC: Supreme/Nike quality.'
        },
        stationery: {
          type: Type.STRING,
          description: 'PROMPT: Modern stationery set mockup (letterhead, envelope, notepad). LAYOUT: Items arranged at artistic angles. DESIGN: Letterhead with [PRIMARY_COLOR] header block (30% of page) - PRIMARY COLOR DOMINANT, logo in white, contact info in [PRIMARY_COLOR] on white body. Envelope with [PRIMARY_COLOR] inner lining visible. Notepad with [PRIMARY_COLOR] cover. BACKGROUND: White surface with soft shadows. STYLE: Professional, sophisticated, corporate. MATERIAL: Premium paper texture. PRIMARY COLOR USAGE: 60% average across items. AESTHETIC: Luxury corporate identity.'
        }
      },
      required: ['logoLight', 'logoDark', 'colorPalette', 'businessCard', 'socialTemplate', 'brandPattern', 'packaging', 'apparel', 'stationery'],
    },
    validation: {
      type: Type.OBJECT,
      properties: {
        isValidLogo: { type: Type.BOOLEAN, description: 'Set to TRUE if this is a professional logo/icon. Set to FALSE if this is a photo of a real person, a landscape, a clearly non-logo photograph, or a screenshot of text.' },
        refusalReason: { type: Type.STRING, description: 'If isValidLogo is false, provide a short French explanation why (e.g. "Ceci est une photo de personne, pas un logo").' }
      },
      required: ['isValidLogo']
    }
  },
  required: ['brandColors', 'typography', 'brandVoice', 'visualAssets', 'validation']
};

export const analyzeLogo = async (base64Image: string, category?: string): Promise<BrandIdentity> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/png', data: base64Image.split(',')[1] } },
        { text: `Analyze this image. First, VALIDATE if this is a company logo.
        
VALIDATION RULES:
- It MUST be a designed logo, icon, or wordmark.
- It CANNOT be a photograph of a person, a selfie, a landscape, or a random object.
- It CANNOT be a complex screenshot of a website.
- If it is NOT a logo, set validation.isValidLogo to FALSE.

If valid, generate a comprehensive brand identity system.


CRITICAL COLOR EXTRACTION:
1. CAREFULLY ANALYZE THE UPLOADED LOGO IMAGE
2. Extract the EXACT primary and secondary colors FROM THE LOGO ITSELF (use precise hex codes from the actual image pixels)
3. DO NOT invent random colors - USE ONLY COLORS THAT APPEAR IN THE LOGO
4. Primary color = the most dominant/visible color in the logo
5. Secondary color = the second most prominent color in the logo

Generate a complete branding JSON identity following the schema. For visualAssets prompts, use the detailed templates provided, replacing placeholders with actual color values from the logo analysis.

IMPORTANT: Make the primary color VERY DOMINANT in all asset prompts (60-80% usage).` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: BRAND_SCHEMA,
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from logo analysis.");
  const result = JSON.parse(text) as BrandIdentity;

  if (result.validation && !result.validation.isValidLogo) {
    throw new Error(result.validation.refusalReason || "L'image fournie ne ressemble pas à un logo valide. Veuillez télécharger un logo d'entreprise.");
  }

  return result;
};

export const generateImage = async (
  prompt: string, 
  brandIdentity: BrandIdentity, 
  logoBase64: string
): Promise<string> => {
  // Convert hex to RGB for better color specification
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const primaryRgb = hexToRgb(brandIdentity.brandColors.primary);
  const secondaryRgb = hexToRgb(brandIdentity.brandColors.secondary);
  const accentRgb = hexToRgb(brandIdentity.brandColors.accent);

  // Inject visual context of the original logo into the image generation process
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/png', data: logoBase64.split(',')[1] } },
        { text: `Task: ${prompt}

Instruction: Use the attached logo as the central design element and primary color reference.

CRITICAL COLOR REQUIREMENTS - EXTRACT FROM THE LOGO IMAGE:
- Primary: ${brandIdentity.brandColors.primary} RGB(${primaryRgb?.r}, ${primaryRgb?.g}, ${primaryRgb?.b}) - USE AS DOMINANT COLOR (60-80% coverage)
- Secondary: ${brandIdentity.brandColors.secondary} RGB(${secondaryRgb?.r}, ${secondaryRgb?.g}, ${secondaryRgb?.b}) - USE AS ACCENT (15-25% coverage)
- Accent: ${brandIdentity.brandColors.accent} RGB(${accentRgb?.r}, ${accentRgb?.g}, ${accentRgb?.b}) - USE SPARINGLY (5-15% coverage)

MODERN DESIGN AESTHETICS:
- Style: Contemporary, minimalist, premium, editorial
- Layout: Clean, balanced, generous white space, sophisticated composition
- Typography: Modern sans-serif, crisp, professional hierarchy
- Shadows: Soft, realistic, depth-enhancing (0px 20px 60px rgba(0,0,0,0.08))
- Lighting: Professional studio lighting, soft diffused, natural highlights
- Finish: Ultra-sharp, 8K resolution, magazine-quality, commercial-grade

VISUAL QUALITY STANDARDS:
- Professional photography aesthetic (think Apple, Nike, luxury brands)
- Sleek, polished, high-end commercial look
- Contemporary 2024+ design trends
- Premium materials appearance (matte, glossy, textured where appropriate)
- Sophisticated color gradients and transitions
- Clean edges, perfect alignment, pixel-perfect precision

ABSOLUTE REQUIREMENTS:
- Extract and match colors FROM THE ATTACHED LOGO IMAGE
- Use PRIMARY COLOR DOMINANTLY (60-80% of the design)
- Use ONLY the specified brand colors above
- NO purple, NO random reds, NO browns, NO grays except neutral backgrounds (#F8F9FA, #FFFFFF)
- Match the RGB values EXACTLY as shown
- NO gibberish text, NO random typography, NO placeholder text
- Modern, stunning, Instagram-worthy aesthetic
- Professional, clean, contemporary design language` }
      ]
    }
  });

  // Extract the generated image from the response
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("Failed to generate brand image - no image data in response.");
};
