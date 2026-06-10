import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GIBProvider } from './context/GIBContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GIBProvider>
      <App />
    </GIBProvider>
  </StrictMode>,
)
