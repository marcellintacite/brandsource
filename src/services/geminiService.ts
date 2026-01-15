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
        logoLight: { type: "string", description: "Prompt: Create a clean brand preview. Center the logo [LOGO_URL]. Use a white background. Add a thin accent border using the primary color [PRIMARY_COLOR]. Minimal, sharp, studio style." },
        logoDark: { type: "string", description: "Prompt: Generate a brand preview with the logo [LOGO_URL] on a dark background in the primary color [PRIMARY_DARK]. Keep the logo bright and clear. Use a simple gradient in the brand colors." },
        colorPalette: { type: "string", description: "Prompt: Create a color palette board for this brand. Show swatches for these colors [COLOR_1], [COLOR_2], [COLOR_3], [COLOR_4], [COLOR_5]. Use a clean grid layout with hex codes under each color. Include a small version of the logo [LOGO_URL]." },
        businessCard: { type: "string", description: "Prompt: Generate a business card mockup for [USER_NAME] using the brand logo [LOGO_URL] and the palette [PRIMARY_COLOR], [SECONDARY_COLOR], [ACCENT_COLOR]. Show front and back. Use minimal layout with clear typography." },
        socialTemplate: { type: "string", description: "Prompt: Create a square social media post template using the brand colors [COLOR_1], [COLOR_2], [COLOR_3]. Place the logo [LOGO_URL] in the top left. Use bold shapes, clean spacing, and a modern layout style." },
        brandPattern: { type: "string", description: "Prompt: Generate a seamless brand pattern using geometric shapes inspired by the logo [LOGO_URL]. Use the full palette [PRIMARY_COLOR], [SECONDARY_COLOR], [ACCENT_COLOR]. Keep it modern, simple, and scalable." }
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

  const prompt = `Analyze this logo${category ? ` for a business in the '${category}' category` : ''}. Generate branding JSON. Focus on specific high-fidelity brand assets. AI images should be clinical, professional, and studio-quality. NO TEXT in generated images except for requested logo markers.`;

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

  const finalPrompt = `Professional studio product photography: ${fullPrompt}. Ultra-sharp, 8k, industrial design style. Featuring diverse professional individuals where appropriate. COLORS: Strictly follow ${brandIdentity.brandColors.primary} and ${brandIdentity.brandColors.secondary}.`;
  
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
