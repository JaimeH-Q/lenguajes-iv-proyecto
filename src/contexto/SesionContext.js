import { createContext } from 'react'

// Contexto con los datos de la sesión. Lo llena <SesionProvider> y se lee con useSesion()
export const SesionContext = createContext(null)
