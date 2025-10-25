import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.tsx'
import ThemeContextProvider from './services/ThemeProvider.tsx'
import { store } from './redux/store.ts'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <BrowserRouter>
    <ThemeContextProvider>
      <Provider store={store}>
    <App />
   
    </Provider>
    </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
