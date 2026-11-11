import { useContext } from 'react'
import { SesionContext } from './SesionContext.js'

// Se usa en cualquier componente: const { usuario, esAdmin, logout } = useSesion()
export function useSesion() {
  return useContext(SesionContext)
}
