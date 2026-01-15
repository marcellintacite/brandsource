import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

import { BrowserRouter } from 'react-router-dom';
import { BrandAnalysisProvider } from './context/BrandAnalysisContext';

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BrandAnalysisProvider>
        <App />
      </BrandAnalysisProvider>
    </BrowserRouter>
  </React.StrictMode>
);
