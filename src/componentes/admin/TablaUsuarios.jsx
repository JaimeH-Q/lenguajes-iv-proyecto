import { formatearFecha, nombresDeRoles } from '../../utilidades/formatos.js'
import { roles } from '../../../compartido/validaciones.js'

// miId: el id del admin que está mirando (no se puede cambiar ni borrar a sí mismo)
export function TablaUsuarios({ usuarios, miId, onCambiarRol, onEliminar }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Se registró</th>
            <th>Veces que entró</th>
            <th>Última vez</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => {
            const soyYo = usuario.id === miId
            return (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={usuario.rol}
                    disabled={soyYo}
                    onChange={(evento) => onCambiarRol(usuario, evento.target.value)}
                  >
                    {roles.map((rol) => (
                      <option key={rol} value={rol}>
                        {nombresDeRoles[rol]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="text-nowrap">{formatearFecha(usuario.fechaAlta)}</td>
                <td>{usuario.vecesQueEntro}</td>
                <td className="text-nowrap">{formatearFecha(usuario.ultimaVez)}</td>
                <td>
                  <button className="btn btn-sm btn-outline-danger" disabled={soyYo} onClick={() => onEliminar(usuario)}>
                    Borrar
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
