import { getGenerativeModel, getImagenModel } from "firebase/ai";
import { ai } from "./firebase";
import { BrandIdentity } from "../types";

// Schema for structured brand identity output
const BRAND_SCHEMA = {
  type: "object",
  properties: {
    brandColors: {
      type: "object",
      properties: {
        primary: { type: "string", description: 'The exact hex code of the primary brand color.' },
        secondary: { type: "string", description: 'The exact hex code of the secondary brand color.' },
        accent: { type: "string", description: 'A vibrant contrast color.' },
        background: { type: "string", description: 'Neutral background.' },
        text: { type: "string", description: 'Neutral dark text.' }
      },
      required: ['primary', 'secondary', 'accent', 'background', 'text'],
    },
    typography: {
      type: "object",
      properties: {
        heading: { type: "string" },
        body: { type: "string" }
      },
      required: ['heading', 'body'],
    },
    brandVoice: {
      type: "array",
      items: { type: "string" },
      description: '3 professional brand adjectives.'
    },
    visualAssets: {
      type: "object",
      properties: {
        logoLight: { 
          type: "string", 
          description: "PROMPT: Professional brand presentation on pristine white background. COMPOSITION: Center the logo prominently, occupying 40% of frame. STYLING: Add subtle drop shadow (0px 20px 40px rgba(0,0,0,0.08)). BORDER: Thin 2px border in [PRIMARY_COLOR] around entire frame with 40px padding. LIGHTING: Soft top-down studio lighting. QUALITY: Ultra-sharp, minimal, editorial style. NO text, NO patterns, ONLY logo and border." 
        },
        logoDark: { 
          type: "string", 
          description: "PROMPT: Premium dark mode brand showcase. BACKGROUND: Rich gradient from [PRIMARY_COLOR] to deeper shade (darken by 20%). COMPOSITION: Logo centered, 35% of frame, ensure high contrast. EFFECTS: Subtle radial glow behind logo using [SECONDARY_COLOR] at 15% opacity. LIGHTING: Dramatic rim lighting from top-right. ATMOSPHERE: Luxury, sophisticated, night-mode aesthetic. NO text overlays." 
        },
        colorPalette: { 
          type: "string", 
          description: "PROMPT: Professional color system documentation board. LAYOUT: 5 vertical color swatches in clean grid, equal spacing (20px gaps). SWATCHES: Each 200x300px rectangle with exact colors [COLOR_1], [COLOR_2], [COLOR_3], [COLOR_4], [COLOR_5]. TYPOGRAPHY: Hex codes below each swatch in clean sans-serif (16px, medium weight). LOGO: Small 80px version in top-right corner. BACKGROUND: Light gray (#F8F9FA). STYLE: Flat design, design system documentation aesthetic, Figma/Sketch style." 
        },
        businessCard: { 
          type: "string", 
          description: "PROMPT: Elegant business card mockup, front and back views side-by-side. FRONT CARD: Logo [LOGO_URL] top-left (60px), name '[USER_NAME]' in bold (18px), title below (12px), contact info bottom-right. BACK CARD: Full bleed [PRIMARY_COLOR] background with subtle [SECONDARY_COLOR] geometric pattern (10% opacity). MATERIAL: Premium matte finish appearance. DIMENSIONS: Standard 3.5x2 inch cards. LIGHTING: Soft overhead with subtle shadow. COLORS: Strict adherence to [PRIMARY_COLOR], [SECONDARY_COLOR], [ACCENT_COLOR]. STYLE: Minimalist, professional, high-end corporate." 
        },
        socialTemplate: { 
          type: "string", 
          description: "PROMPT: Modern Instagram post template, 1080x1080px square. LAYOUT: Logo [LOGO_URL] in top-left (120px with 40px padding). BACKGROUND: Split diagonal design - 60% [PRIMARY_COLOR], 40% [SECONDARY_COLOR]. GEOMETRIC ELEMENTS: 3 abstract circles/shapes in [ACCENT_COLOR] at 20% opacity. TEXT AREA: Large white rectangle (600x400px) centered for copy. STYLE: Bold, contemporary, social media ready, high contrast. SPACING: Generous margins (60px). AESTHETIC: Canva/Adobe Express template style." 
        },
        brandPattern: { 
          type: "string", 
          description: "PROMPT: Seamless repeating brand pattern for backgrounds. ELEMENTS: Extract 2-3 geometric shapes from logo design (circles, lines, angles). COLORS: Rotate between [PRIMARY_COLOR] (50%), [SECONDARY_COLOR] (30%), [ACCENT_COLOR] (20%). LAYOUT: Diagonal grid pattern, 45-degree angle, elements spaced 150px apart. OPACITY: Vary between 15-40% for depth. SIZE: 1200x1200px tileable pattern. STYLE: Subtle, sophisticated, suitable for backgrounds/packaging. INSPIRATION: Luxury brand patterns, wallpaper design." 
        }
      },
      required: ['logoLight', 'logoDark', 'colorPalette', 'businessCard', 'socialTemplate', 'brandPattern'],
    }
  },
  required: ['brandColors', 'typography', 'brandVoice', 'visualAssets']
};

export const analyzeLogo = async (base64Image: string, category?: string): Promise<BrandIdentity> => {
  const model = getGenerativeModel(ai, { 
    model: "gemini-3-flash-preview",
    generationConfig: {
      responseMimeType: "application/json",
      // @ts-ignore - Support for responseSchema in experimental SDK
      responseSchema: BRAND_SCHEMA,
    }
  });

  const prompt = `
TASK: Analyze this logo${category ? ` for a business in the '${category}' category` : ''} and generate a comprehensive brand identity system.

REQUIREMENTS:
1. Extract the EXACT primary and secondary colors from the logo (use precise hex codes)
2. Generate complementary accent, background, and text colors that harmonize with the logo
3. Suggest professional typography that matches the brand personality
4. Create 3 sophisticated brand voice adjectives (e.g., "Bold", "Innovative", "Trustworthy")
5. For each visual asset, write a DETAILED, STRUCTURED prompt following this format:
   - Start with "PROMPT:"
   - Include specific composition details (layout, positioning, sizing)
   - Specify exact color usage with placeholders like [PRIMARY_COLOR]
   - Define lighting and atmosphere
   - Describe the desired aesthetic and quality level
   - Include technical specifications (dimensions, style references)

VISUAL ASSET GUIDELINES:
- logoLight: Clean presentation on white background with border
- logoDark: Luxury dark mode showcase with gradient
- colorPalette: Professional design system documentation
- businessCard: Front/back mockup with realistic materials
- socialTemplate: Modern Instagram-ready template
- brandPattern: Seamless repeating pattern for backgrounds

OUTPUT: Return valid JSON matching the schema. Be specific and detailed in all visual asset prompts.
`.trim();


  const result = await model.generateContent([
    { inlineData: { mimeType: "image/png", data: base64Image.split(',')[1] } },
    { text: prompt }
  ]);

  const text = result.response.text();
  if (!text) throw new Error("No response from AI service");
  return JSON.parse(text) as BrandIdentity;
};

export const generateImage = async (templatePrompt: string, brandIdentity: BrandIdentity, options: { logoUrl?: string, userName?: string } = {}): Promise<string> => {
  const model = getImagenModel(ai, { 
    model: "imagen-4.0-generate-001" 
  });

  // Replacement logic for the 6 specific templates
  let fullPrompt = templatePrompt;
  const colors = [
    brandIdentity.brandColors.primary,
    brandIdentity.brandColors.secondary,
    brandIdentity.brandColors.accent,
    brandIdentity.brandColors.background,
    brandIdentity.brandColors.text
  ];

  fullPrompt = fullPrompt
    .replace(/\[LOGO_URL\]/g, options.logoUrl ? `the provided logo` : "the brand logo")
    .replace(/\[PRIMARY_COLOR\]/g, brandIdentity.brandColors.primary)
    .replace(/\[SECONDARY_COLOR\]/g, brandIdentity.brandColors.secondary)
    .replace(/\[ACCENT_COLOR\]/g, brandIdentity.brandColors.accent)
    .replace(/\[PRIMARY_DARK\]/g, brandIdentity.brandColors.primary) // Usually primary is the dark base
    .replace(/\[USER_NAME\]/g, options.userName || "Professional")
    .replace(/\[COLOR_1\]/g, colors[0])
    .replace(/\[COLOR_2\]/g, colors[1])
    .replace(/\[COLOR_3\]/g, colors[2])
    .replace(/\[COLOR_4\]/g, colors[3])
    .replace(/\[COLOR_5\]/g, colors[4]);

  const finalPrompt = `
BRAND IDENTITY CONTEXT:
- Primary Brand Color: ${brandIdentity.brandColors.primary} (MUST be dominant)
- Secondary Brand Color: ${brandIdentity.brandColors.secondary} (MUST be visible)
- Accent Color: ${brandIdentity.brandColors.accent}
- Brand Voice: ${brandIdentity.brandVoice.join(', ')}

VISUAL REQUIREMENTS:
${fullPrompt}

TECHNICAL SPECIFICATIONS:
- Resolution: 8K ultra-sharp, professional studio photography
- Style: Clean, modern, editorial design aesthetic
- Lighting: Professional studio lighting with soft shadows
- Color Accuracy: Exact hex color matching required
- Composition: Rule of thirds, balanced, professional framing
- Quality: Premium, publication-ready, high-end commercial

STRICT RULES:
1. Use ONLY the specified brand colors (${brandIdentity.brandColors.primary}, ${brandIdentity.brandColors.secondary}, ${brandIdentity.brandColors.accent})
2. NO random colors, NO generic stock imagery colors
3. NO text overlays unless explicitly requested in prompt
4. Professional, polished, commercial-grade output
5. Diverse representation where people are featured
6. Clean, uncluttered compositions
`.trim();
  
  
  try {
    const response = await model.generateImages(finalPrompt);

    if (response.filteredReason) {
      console.warn("Image generation filtered:", response.filteredReason);
    }

    if (response.images.length === 0) {
      throw new Error("No images returned by the model.");
    }

    const image = response.images[0];
    return `data:${image.mimeType};base64,${image.bytesBase64Encoded}`;
  } catch (error) {
    console.error("Firebase AI Image Generation Error:", error);
    throw error;
  }
};
