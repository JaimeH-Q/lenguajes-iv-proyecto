// Si no hay sesión iniciada, redirige a /login (y después vuelve a esta ruta)
import { Navigate, Outlet, useLocation } from 'react-router'
import { useSesion } from '../contexto/useSesion.js'
import { Cargando } from '../componentes/comunes/Cargando.jsx'

export function RutaPrivada() {
  const { estaLogueado, cargando } = useSesion()
  const location = useLocation()

  if (cargando) return <Cargando />
  if (!estaLogueado) return <Navigate to="/login" state={{ volverA: location.pathname }} replace />
  return <Outlet />
}
