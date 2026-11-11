// Detalle de una consulta: datos, seguimiento (correos enviados) y respuesta
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { obtenerConsulta, responderConsulta, actualizarEstadoConsulta, eliminarConsulta } from '../../api/consultas.js'
import { useSesion } from '../../contexto/useSesion.js'
import { CampoFormulario } from '../../componentes/comunes/CampoFormulario.jsx'
import { Cargando } from '../../componentes/comunes/Cargando.jsx'
import { AlertaError } from '../../componentes/comunes/AlertaError.jsx'
import { AlertaExito } from '../../componentes/comunes/AlertaExito.jsx'
import { validarRespuesta, hayErrores } from '../../../compartido/validaciones.js'
import { formatearFecha, nombresDeTipos, nombresDeEstados } from '../../utilidades/formatos.js'

export function DetalleConsulta() {
  const { id } = useParams()
  const { esAdmin } = useSesion()
  const navigate = useNavigate()
  const [consulta, setConsulta] = useState(null)
  const [respuesta, setRespuesta] = useState({ asunto: 'Respuesta a tu consulta', texto: '' })
  const [errores, setErrores] = useState({})
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    obtenerConsulta(id)
      .then(setConsulta)
      .catch((err) => setError(err.message))
  }, [id])

  function manejarCambio(evento) {
    setRespuesta({ ...respuesta, [evento.target.name]: evento.target.value })
  }

  async function manejarRespuesta(evento) {
    evento.preventDefault()
    setError('')
    setExito('')

    const erroresEncontrados = validarRespuesta(respuesta)
    setErrores(erroresEncontrados)
    if (hayErrores(erroresEncontrados)) return

    setEnviando(true)
    try {
      setConsulta(await responderConsulta(id, respuesta))
      setRespuesta({ ...respuesta, texto: '' })
      setExito(`Respuesta enviada a ${consulta.email}`)
    } catch (err) {
      setError(err.message)
      setErrores(err.errores ?? {})
    } finally {
      setEnviando(false)
    }
  }

  async function manejarCambioEstado(estado) {
    try {
      setConsulta(await actualizarEstadoConsulta(id, estado))
    } catch (err) {
      setError(err.message)
    }
  }

  async function manejarEliminar() {
    if (!confirm('¿Seguro que querés borrar esta consulta?')) return
    try {
      await eliminarConsulta(id)
      navigate('/admin/consultas')
    } catch (err) {
      setError(err.message)
    }
  }

  if (!consulta) return error ? <AlertaError mensaje={error} /> : <Cargando />

  return (
    <>
      <Link to="/admin/consultas" className="small">
        ← Volver a consultas
      </Link>
      <h1 className="h3 mt-2 mb-3">Consulta de {consulta.nombre}</h1>

      <div className="card card-body mb-4">
        <p className="mb-1">
          <strong>Email:</strong> {consulta.email}
        </p>
        <p className="mb-1">
          <strong>Tipo:</strong> {nombresDeTipos[consulta.tipo]}
        </p>
        <p className="mb-1">
          <strong>Fecha:</strong> {formatearFecha(consulta.fecha)}
        </p>
        <p className="mb-3">
          <strong>Estado:</strong> {nombresDeEstados[consulta.estado]}
        </p>
        <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
          {consulta.mensaje}
        </p>
        <div className="d-flex gap-2 mt-3">
          {consulta.estado !== 'cerrada' ? (
            <button className="btn btn-sm btn-outline-secondary" onClick={() => manejarCambioEstado('cerrada')}>
              Marcar como cerrada
            </button>
          ) : (
            <button className="btn btn-sm btn-outline-secondary" onClick={() => manejarCambioEstado('pendiente')}>
              Volver a abrir
            </button>
          )}
          {esAdmin && (
            <button className="btn btn-sm btn-outline-danger" onClick={manejarEliminar}>
              Borrar consulta
            </button>
          )}
        </div>
      </div>

      <h2 className="h5">Seguimiento (correos de esta consulta)</h2>
      <ul className="list-group mb-4">
        {consulta.correos.map((correo) => (
          <li className="list-group-item" key={correo.id}>
            <div className="small text-secondary">
              {formatearFecha(correo.fecha)} · Para: {correo.para}
            </div>
            <strong>{correo.asunto}</strong>
            <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
              {correo.texto}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="h5">Responder</h2>
      <AlertaExito mensaje={exito} />
      <AlertaError mensaje={error} />
      <form onSubmit={manejarRespuesta} noValidate>
        <CampoFormulario etiqueta="Asunto" nombre="asunto" valor={respuesta.asunto} onChange={manejarCambio} error={errores.asunto} />
        <CampoFormulario etiqueta="Respuesta" nombre="texto" elemento="textarea" valor={respuesta.texto} onChange={manejarCambio} error={errores.texto} />
        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando ? 'Mandando...' : `Mandar a ${consulta.email}`}
        </button>
      </form>
    </>
  )
}
