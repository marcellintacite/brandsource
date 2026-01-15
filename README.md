# 🍊 BrandSource AI Studio

<div align="center">

**L'Identité Intuitive.** Un studio de design intelligent pour créer votre identité visuelle complète en quelques secondes.

[![Live Demo](https://img.shields.io/badge/demo-live-orange)](https://brandsource.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

</div>

## ✨ Features

- **🎨 AI-Powered Brand Generation**: Upload your logo and get a complete brand identity (colors, typography, voice)
- **🖼️ Professional Mockups**: High-fidelity CSS mockups for business cards, posters, social media, and more
- **🌅 Lifestyle Inspirations**: AI-generated contextual images powered by Google Gemini Imagen 4.0
- **📱 Native PWA Experience**: Premium mobile and desktop experience with native-like interactions
- **🔥 Firebase Integration**: Real-time authentication, storage, and analytics
- **🎯 Project Management**: Save and manage multiple brand identities

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Firebase account
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/marcellintacite/brandsource.git
   cd brandsource
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file with:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS v4 with custom orange design system
- **AI/ML**: Google Gemini API (Gemini 2.0 Flash + Imagen 4.0)
- **Backend**: Firebase (Auth, Firestore, Storage)
- **PWA**: Service Workers with offline support

## 📂 Project Structure

```
brandsource/
├── src/
│   ├── components/
│   │   ├── features/      # Brand dashboard, uploader, mockups
│   │   ├── layout/        # Navbar, footer
│   │   └── pages/         # Studio, projects pages
│   ├── context/           # React context (brand analysis)
│   ├── hooks/             # Custom hooks (auth, brand analysis)
│   ├── services/          # Firebase & Gemini API services
│   ├── styles/            # Global CSS & Tailwind config
│   └── types/             # TypeScript definitions
├── public/                # PWA assets, manifest, service worker
└── index.html
```

## 🎨 Design System

The application features a premium **Orange Sunset** design system:

- **Primary**: `#f97316` (Orange 500)
- **Secondary**: `#fbbf24` (Amber 400)
- **Native Interactions**: Touch-optimized with tactile feedback
- **Immersive Backgrounds**: Blurry gradient decorations

## 🔒 Firebase Security

Firestore rules ensure:
- Users can only access their own brand analyses
- Public read access for analytics counters
- Authenticated writes only

## 📱 PWA Features

- **Offline Support**: Service worker caching
- **Native Feel**: No tap highlights, elastic scrolling disabled
- **Safe Areas**: iOS/Android notch support
- **Install Prompt**: Add to home screen capability

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Powered by [Google Gemini](https://ai.google.dev/)
- Built with [Firebase](https://firebase.google.com/)
- Designed with ❤️ for brand creators

---

<div align="center">
Made with 🍊 by the BrandSource team
</div>
