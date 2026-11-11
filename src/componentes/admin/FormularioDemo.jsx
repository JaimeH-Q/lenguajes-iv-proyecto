// Formulario para crear o editar una demo.
// Si recibe "demo" es para editarla; si no, es una nueva.
import { useState } from 'react'
import { CampoFormulario } from '../comunes/CampoFormulario.jsx'
import { AlertaError } from '../comunes/AlertaError.jsx'
import { validarDemo, hayErrores } from '../../../compartido/validaciones.js'

export function FormularioDemo({ demo, proyectos, onGuardar, onCancelar }) {
  const esNueva = !demo
  const [datos, setDatos] = useState({
    proyectoId: demo?.proyectoId ? String(demo.proyectoId) : '',
    titulo: demo?.titulo ?? '',
    descripcion: demo?.descripcion ?? '',
    linkDemo: demo?.linkDemo ?? '',
  })
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [guardando, setGuardando] = useState(false)

  function manejarCambio(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value })
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setErrorGeneral('')

    const erroresEncontrados = validarDemo(datos)
    setErrores(erroresEncontrados)
    if (hayErrores(erroresEncontrados)) return

    setGuardando(true)
    try {
      await onGuardar({ ...datos, proyectoId: Number(datos.proyectoId) })
    } catch (error) {
      setErrorGeneral(error.message)
      setErrores(error.errores ?? {})
    } finally {
      setGuardando(false)
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="card card-body mb-4">
      <h2 className="h5">{esNueva ? 'Demo nueva' : `Cambiar "${demo.titulo}"`}</h2>
      <AlertaError mensaje={errorGeneral} />
      <CampoFormulario etiqueta="Proyecto" nombre="proyectoId" elemento="select" valor={datos.proyectoId} onChange={manejarCambio} error={errores.proyectoId}>
        <option value="">Elegí un proyecto</option>
        {proyectos.map((proyecto) => (
          <option key={proyecto.id} value={proyecto.id}>
            {proyecto.titulo}
          </option>
        ))}
      </CampoFormulario>
      <CampoFormulario etiqueta="Título" nombre="titulo" valor={datos.titulo} onChange={manejarCambio} error={errores.titulo} />
      <CampoFormulario etiqueta="Descripción" nombre="descripcion" elemento="textarea" valor={datos.descripcion} onChange={manejarCambio} error={errores.descripcion} />
      <CampoFormulario
        etiqueta="Link de la demo (https://... o /demos/archivo.html)"
        nombre="linkDemo"
        valor={datos.linkDemo}
        onChange={manejarCambio}
        error={errores.linkDemo}
      />
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar'}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  )
}
