import { NavLink } from 'react-router'
import { useSesion } from '../../contexto/useSesion.js'

const opcionesOperador = [{ a: '/admin/consultas', texto: 'Consultas' }]

const opcionesAdmin = [
  { a: '/admin/dashboard', texto: 'Dashboard' },
  { a: '/admin/consultas', texto: 'Consultas' },
  { a: '/admin/correos', texto: 'Correos enviados' },
  { a: '/admin/proyectos', texto: 'Proyectos' },
  { a: '/admin/demos', texto: 'Demos' },
  { a: '/admin/servicios', texto: 'Servicios' },
  { a: '/admin/usuarios', texto: 'Usuarios' },
]

export function MenuAdmin() {
  const { esAdmin } = useSesion()
  const opciones = esAdmin ? opcionesAdmin : opcionesOperador

  return (
    <div className="list-group mb-4">
      {opciones.map((opcion) => (
        <NavLink key={opcion.a} to={opcion.a} className="list-group-item list-group-item-action">
          {opcion.texto}
        </NavLink>
      ))}
    </div>
  )
}
