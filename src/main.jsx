import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/manrope'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './estilos/index.css'
import { SesionProvider } from './contexto/SesionProvider.jsx'
import { activarDestelloVidrio } from './utilidades/destelloVidrio.js'
import App from './App.jsx'

activarDestelloVidrio()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SesionProvider>
        <App />
      </SesionProvider>
    </BrowserRouter>
  </StrictMode>,
)
