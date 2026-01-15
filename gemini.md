# Project: BrandSource Studio AI - Context Summary

## 🎯 Mission
BrandSource Studio AI is a high-end, automated brand identity engine. It transforms a single logo upload into a comprehensive "Source of Truth" branding dashboard, including dynamic color systems, typography, and AI-generated lifestyle photography.

## 🛠 Tech Stack
- **Frontend:** React 19 + Tailwind CSS.
- **AI Models:** 
    - `gemini-3-flash-preview`: For multi-modal logo analysis and JSON metadata generation.
    - `gemini-2.5-flash-image`: For generating premium, context-aware lifestyle photography.
- **Styling:** Custom CSS variables (`--brand-primary`, `--brand-secondary`) for real-time interface theming.
- **Fonts:** Space Grotesk (Headings) & Plus Jakarta Sans (Body).

## 🚀 Key Features Implemented

### 1. Intelligent Logo Analysis
- Analyzes uploaded logos to extract exact HEX codes for Primary, Secondary, Accent, Background, and Text colors.
- Recommends professional typography pairings and defines a three-word "Brand Voice."

### 2. Chameleon UI (Dynamic Theming)
- The entire dashboard (buttons, borders, icons, progress indicators) dynamically updates its CSS variables based on the analyzed logo colors.
- Provides an immediate "branded" experience for the user.

### 3. Production Stationery "Frames" (React-based)
- **A4 Letterhead:** Clean, professional layout with logo injection.
- **Social Media Grid:** Branded square templates with dynamic background patterns.
- **Premium Business Cards:** Front/Back luxury mockups.
- **Corporate Signage:** Realistic signage preview (Acrylic/Metal).
- **Web Hero Section:** A functional hero component mockup.
- **Merchandising:** Branded hoodie/merch preview.
- **Feature:** All frames are clickable, opening a **Fullscreen Modal** for high-fidelity viewing and export options.

### 4. Lifestyle Context Generation (Gemini Image)
- Generates 6 realistic "in-situ" photos (e.g., a speaker in a branded t-shirt, a modern office lobby).
- **Prompt Guardrails:** Prompts are specifically engineered to focus on environment, materials, and lighting using brand colors, while strictly avoiding AI-generated text/logos (which are overlaid via React instead).

## 📋 Data Structure (`BrandIdentity`)
```typescript
{
  brandColors: {
    primary: string;    // Core anchor color
    secondary: string;  // Supporting highlight
    accent: string;     // High-contrast detail
    background: string;
    text: string;
  },
  typography: {
    heading: string;
    body: string;
  },
  brandVoice: string[]; // Adjectives (e.g., ["Innovative", "Clean", "Open"])
  visualAssets: {
    flyerEvent: string; // Prompt for AI generation
    instaSpeaker: string;
    // ...etc
  }
}




