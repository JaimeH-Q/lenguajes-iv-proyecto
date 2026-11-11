// Layout del panel de admin: menú a la izquierda y la página actual a la derecha
import { Outlet } from 'react-router'
import { MenuAdmin } from '../../componentes/admin/MenuAdmin.jsx'
import { useSesion } from '../../contexto/useSesion.js'
import { nombresDeRoles } from '../../utilidades/formatos.js'

export function LayoutAdmin() {
  const { usuario } = useSesion()

  return (
    <section className="py-4">
      <p className="text-secondary small mb-3">Panel · {nombresDeRoles[usuario.rol]}</p>
      <div className="row">
        <div className="col-12 col-md-3">
          <MenuAdmin />
        </div>
        <div className="col-12 col-md-9">
          <Outlet />
        </div>
      </div>
    </section>
  )
}
