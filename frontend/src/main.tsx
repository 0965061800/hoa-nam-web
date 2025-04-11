import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/main.css"
import AppRoutes from './routes/index.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
)
