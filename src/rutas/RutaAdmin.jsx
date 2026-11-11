// Solo deja pasar al administrador
import { Navigate, Outlet } from 'react-router'
import { useSesion } from '../contexto/useSesion.js'
import { Cargando } from '../componentes/comunes/Cargando.jsx'

export function RutaAdmin() {
  const { esAdmin, cargando } = useSesion()

  if (cargando) return <Cargando />
  if (!esAdmin) return <Navigate to="/admin" replace />
  return <Outlet />
}
