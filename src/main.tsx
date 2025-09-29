import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import ThemeContextProvider from './services/ThemeProvider.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeContextProvider>
    <App />
    </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
