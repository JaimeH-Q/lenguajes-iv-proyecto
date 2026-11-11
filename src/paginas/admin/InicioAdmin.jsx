// Al entrar a /admin redirige a la primera página según el rol
import { Navigate } from 'react-router'
import { useSesion } from '../../contexto/useSesion.js'

export function InicioAdmin() {
  const { esAdmin } = useSesion()
  return <Navigate to={esAdmin ? '/admin/dashboard' : '/admin/consultas'} replace />
}
