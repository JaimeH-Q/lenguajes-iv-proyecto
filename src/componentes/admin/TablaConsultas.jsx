import { Link } from 'react-router'
import { formatearFecha, nombresDeTipos, nombresDeEstados } from '../../utilidades/formatos.js'

const coloresDeEstado = { pendiente: 'warning', respondida: 'success', cerrada: 'secondary' }

export function TablaConsultas({ consultas }) {
  if (consultas.length === 0) {
    return <p className="text-secondary">No hay consultas con esos filtros.</p>
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta) => (
            <tr key={consulta.id}>
              <td className="text-nowrap">{formatearFecha(consulta.fecha)}</td>
              <td>{consulta.nombre}</td>
              <td>{consulta.email}</td>
              <td>{nombresDeTipos[consulta.tipo]}</td>
              <td>
                <span className={`badge text-bg-${coloresDeEstado[consulta.estado]}`}>
                  {nombresDeEstados[consulta.estado]}
                </span>
              </td>
              <td>
                <Link to={`/admin/consultas/${consulta.id}`} className="btn btn-sm btn-outline-primary">
                  Ver
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
