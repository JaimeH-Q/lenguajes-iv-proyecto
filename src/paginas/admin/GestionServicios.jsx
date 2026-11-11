import { useEffect, useState } from 'react'
import { obtenerServicios, crearServicio, actualizarServicio, eliminarServicio } from '../../api/servicios.js'
import { FormularioServicio } from '../../componentes/admin/FormularioServicio.jsx'
import { Cargando } from '../../componentes/comunes/Cargando.jsx'
import { AlertaError } from '../../componentes/comunes/AlertaError.jsx'
import { formatearPrecio } from '../../utilidades/formatos.js'

export function GestionServicios() {
  const [servicios, setServicios] = useState(null)
  // editando: null (no se muestra el formulario), 'nuevo', o el servicio que se está cambiando
  const [editando, setEditando] = useState(null)
  const [recargas, setRecargas] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerServicios()
      .then(setServicios)
      .catch((err) => setError(err.message))
  }, [recargas])

  async function manejarGuardar(datos) {
    if (editando === 'nuevo') await crearServicio(datos)
    else await actualizarServicio(editando.id, datos)
    setEditando(null)
    setRecargas(recargas + 1)
  }

  async function manejarEliminar(servicio) {
    if (!confirm(`¿Seguro que querés borrar "${servicio.nombre}"?`)) return
    try {
      await eliminarServicio(servicio.id)
      setRecargas(recargas + 1)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Servicios</h1>
        {!editando && (
          <button className="btn btn-primary" onClick={() => setEditando('nuevo')}>
            Nuevo servicio
          </button>
        )}
      </div>

      {editando && (
        <FormularioServicio
          key={editando === 'nuevo' ? 'nuevo' : editando.id}
          servicio={editando === 'nuevo' ? null : editando}
          onGuardar={manejarGuardar}
          onCancelar={() => setEditando(null)}
        />
      )}

      <AlertaError mensaje={error} />
      {!servicios ? (
        <Cargando />
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Desde</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio) => (
                <tr key={servicio.id}>
                  <td>{servicio.nombre}</td>
                  <td className="small">{servicio.descripcion}</td>
                  <td className="text-nowrap">{formatearPrecio(servicio.precioDesde)}</td>
                  <td className="text-nowrap">
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => setEditando(servicio)}>
                      Cambiar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => manejarEliminar(servicio)}>
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
