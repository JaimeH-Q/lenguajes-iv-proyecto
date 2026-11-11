import { useEffect, useState } from 'react'
import { obtenerProyectosCompletos, crearProyecto, actualizarProyecto, eliminarProyecto } from '../../api/proyectos.js'
import { FormularioProyecto } from '../../componentes/admin/FormularioProyecto.jsx'
import { Cargando } from '../../componentes/comunes/Cargando.jsx'
import { AlertaError } from '../../componentes/comunes/AlertaError.jsx'
import { formatearFecha, urlImagen } from '../../utilidades/formatos.js'

export function GestionProyectos() {
  const [proyectos, setProyectos] = useState(null)
  // editando: null (no se muestra el formulario), 'nuevo', o el proyecto que se está cambiando
  const [editando, setEditando] = useState(null)
  const [recargas, setRecargas] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerProyectosCompletos()
      .then(setProyectos)
      .catch((err) => setError(err.message))
  }, [recargas])

  async function manejarGuardar(formulario) {
    if (editando === 'nuevo') await crearProyecto(formulario)
    else await actualizarProyecto(editando.id, formulario)
    setEditando(null)
    setRecargas(recargas + 1)
  }

  async function manejarEliminar(proyecto) {
    if (!confirm(`¿Seguro que querés borrar "${proyecto.titulo}"? También se borran sus demos.`)) return
    try {
      await eliminarProyecto(proyecto.id)
      setRecargas(recargas + 1)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Proyectos</h1>
        {!editando && (
          <button className="btn btn-primary" onClick={() => setEditando('nuevo')}>
            Nuevo proyecto
          </button>
        )}
      </div>

      {editando && (
        <FormularioProyecto
          key={editando === 'nuevo' ? 'nuevo' : editando.id}
          proyecto={editando === 'nuevo' ? null : editando}
          onGuardar={manejarGuardar}
          onCancelar={() => setEditando(null)}
        />
      )}

      <AlertaError mensaje={error} />
      {!proyectos ? (
        <Cargando />
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Tecnologías</th>
                <th>Alta</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto) => (
                <tr key={proyecto.id}>
                  <td>
                    {proyecto.imagen ? (
                      <img src={urlImagen(proyecto.imagen)} alt="" className="miniatura" />
                    ) : (
                      <span className="text-secondary small">Sin imagen</span>
                    )}
                  </td>
                  <td>{proyecto.titulo}</td>
                  <td className="small">{proyecto.tecnologias}</td>
                  <td className="text-nowrap small">{formatearFecha(proyecto.fechaAlta)}</td>
                  <td className="text-nowrap">
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => setEditando(proyecto)}>
                      Cambiar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => manejarEliminar(proyecto)}>
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
