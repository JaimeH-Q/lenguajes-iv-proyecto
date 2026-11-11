import { useEffect, useState } from 'react'
import { obtenerDemos, crearDemo, actualizarDemo, eliminarDemo } from '../../api/demos.js'
import { obtenerProyectos } from '../../api/proyectos.js'
import { FormularioDemo } from '../../componentes/admin/FormularioDemo.jsx'
import { Cargando } from '../../componentes/comunes/Cargando.jsx'
import { AlertaError } from '../../componentes/comunes/AlertaError.jsx'

export function GestionDemos() {
  const [demos, setDemos] = useState(null)
  const [proyectos, setProyectos] = useState([])
  // editando: null (no se muestra el formulario), 'nueva', o la demo que se está cambiando
  const [editando, setEditando] = useState(null)
  const [recargas, setRecargas] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerDemos()
      .then(setDemos)
      .catch((err) => setError(err.message))
  }, [recargas])

  useEffect(() => {
    obtenerProyectos()
      .then(setProyectos)
      .catch((err) => setError(err.message))
  }, [])

  async function manejarGuardar(datos) {
    if (editando === 'nueva') await crearDemo(datos)
    else await actualizarDemo(editando.id, datos)
    setEditando(null)
    setRecargas(recargas + 1)
  }

  async function manejarEliminar(demo) {
    if (!confirm(`¿Seguro que querés borrar "${demo.titulo}"?`)) return
    try {
      await eliminarDemo(demo.id)
      setRecargas(recargas + 1)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Demos</h1>
        {!editando && (
          <button className="btn btn-primary" onClick={() => setEditando('nueva')}>
            Nueva demo
          </button>
        )}
      </div>

      {editando && (
        <FormularioDemo
          key={editando === 'nueva' ? 'nueva' : editando.id}
          demo={editando === 'nueva' ? null : editando}
          proyectos={proyectos}
          onGuardar={manejarGuardar}
          onCancelar={() => setEditando(null)}
        />
      )}

      <AlertaError mensaje={error} />
      {!demos ? (
        <Cargando />
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Título</th>
                <th>Proyecto</th>
                <th>Link</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {demos.map((demo) => (
                <tr key={demo.id}>
                  <td>{demo.titulo}</td>
                  <td>{demo.tituloProyecto}</td>
                  <td className="small">
                    <a href={demo.linkDemo} target="_blank" rel="noreferrer">
                      {demo.linkDemo}
                    </a>
                  </td>
                  <td className="text-nowrap">
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => setEditando(demo)}>
                      Cambiar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => manejarEliminar(demo)}>
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
