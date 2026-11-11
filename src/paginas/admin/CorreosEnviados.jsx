// Correos enviados por el servicio de correo simulado, con su contenido completo
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { obtenerCorreos } from '../../api/correos.js'
import { Cargando } from '../../componentes/comunes/Cargando.jsx'
import { AlertaError } from '../../componentes/comunes/AlertaError.jsx'
import { formatearFecha } from '../../utilidades/formatos.js'

export function CorreosEnviados() {
  const [correos, setCorreos] = useState(null)
  const [seleccionado, setSeleccionado] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerCorreos()
      .then(setCorreos)
      .catch((err) => setError(err.message))
  }, [])

  if (!correos) return error ? <AlertaError mensaje={error} /> : <Cargando />

  const textoBuscado = busqueda.trim().toLowerCase()
  const correosFiltrados = correos.filter(
    (correo) =>
      correo.para.toLowerCase().includes(textoBuscado) || correo.asunto.toLowerCase().includes(textoBuscado),
  )

  return (
    <>
      <h1 className="h3 mb-1">Correos enviados</h1>
      <p className="text-secondary small mb-3">
        Los correos no se mandan de verdad: quedan guardados acá para poder verlos.
      </p>

      <input
        type="search"
        className="form-control mb-3"
        placeholder="Buscar por email o asunto"
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
      />

      <div className="row g-3">
        <div className="col-12 col-lg-5">
          <div className="list-group listaDeCorreos">
            {correosFiltrados.length === 0 && <p className="text-secondary">No hay correos.</p>}
            {correosFiltrados.map((correo) => (
              <button
                type="button"
                key={correo.id}
                className={`list-group-item list-group-item-action ${seleccionado?.id === correo.id ? 'active' : ''}`}
                onClick={() => setSeleccionado(correo)}
              >
                <div className="small">{correo.para}</div>
                <div className="fw-semibold text-truncate">{correo.asunto}</div>
                <div className="small opacity-75">{formatearFecha(correo.fecha)}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="col-12 col-lg-7">
          {seleccionado ? (
            <div className="card">
              <div className="card-header">
                <div>
                  <strong>Para:</strong> {seleccionado.para}
                </div>
                <div>
                  <strong>Asunto:</strong> {seleccionado.asunto}
                </div>
                <div className="small text-secondary">{formatearFecha(seleccionado.fecha)}</div>
              </div>
              <div className="card-body">
                <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                  {seleccionado.texto}
                </p>
              </div>
              {seleccionado.consultaId && (
                <div className="card-footer">
                  <Link to={`/admin/consultas/${seleccionado.consultaId}`} className="small">
                    Ver la consulta de este correo
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <p className="text-secondary">Elegí un correo de la lista para ver lo que dice.</p>
          )}
        </div>
      </div>
    </>
  )
}
