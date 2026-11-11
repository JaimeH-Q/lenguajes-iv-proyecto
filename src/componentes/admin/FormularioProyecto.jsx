// Formulario para crear o editar un proyecto.
// Si recibe "proyecto" es para editarlo; si no, es uno nuevo.
// onGuardar recibe un FormData (porque lleva la imagen).
import { useState } from 'react'
import { CampoFormulario } from '../comunes/CampoFormulario.jsx'
import { AlertaError } from '../comunes/AlertaError.jsx'
import { validarProyecto, validarImagen, hayErrores, tiposDeImagen } from '../../../compartido/validaciones.js'

export function FormularioProyecto({ proyecto, onGuardar, onCancelar }) {
  const esNuevo = !proyecto
  const [datos, setDatos] = useState({
    titulo: proyecto?.titulo ?? '',
    descripcion: proyecto?.descripcion ?? '',
    tecnologias: proyecto?.tecnologias ?? '',
    linkRepo: proyecto?.linkRepo ?? '',
  })
  const [imagen, setImagen] = useState(null)
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [guardando, setGuardando] = useState(false)

  function manejarCambio(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value })
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setErrorGeneral('')

    const erroresEncontrados = { ...validarProyecto(datos), ...validarImagen(imagen, esNuevo) }
    setErrores(erroresEncontrados)
    if (hayErrores(erroresEncontrados)) return

    const formulario = new FormData()
    formulario.append('titulo', datos.titulo)
    formulario.append('descripcion', datos.descripcion)
    formulario.append('tecnologias', datos.tecnologias)
    formulario.append('linkRepo', datos.linkRepo)
    if (imagen) formulario.append('imagen', imagen)

    setGuardando(true)
    try {
      await onGuardar(formulario)
    } catch (error) {
      setErrorGeneral(error.message)
      setErrores(error.errores ?? {})
    } finally {
      setGuardando(false)
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="card card-body mb-4">
      <h2 className="h5">{esNuevo ? 'Proyecto nuevo' : `Cambiar "${proyecto.titulo}"`}</h2>
      <AlertaError mensaje={errorGeneral} />
      <CampoFormulario etiqueta="Título" nombre="titulo" valor={datos.titulo} onChange={manejarCambio} error={errores.titulo} />
      <CampoFormulario etiqueta="Descripción" nombre="descripcion" elemento="textarea" valor={datos.descripcion} onChange={manejarCambio} error={errores.descripcion} />
      <CampoFormulario
        etiqueta="Tecnologías (separadas por coma)"
        nombre="tecnologias"
        valor={datos.tecnologias}
        onChange={manejarCambio}
        error={errores.tecnologias}
      />
      <CampoFormulario etiqueta="Link del repositorio (opcional)" nombre="linkRepo" valor={datos.linkRepo} onChange={manejarCambio} error={errores.linkRepo} />

      <div className="mb-3">
        <label htmlFor="imagen" className="form-label">
          Imagen {esNuevo ? '' : '(dejala vacía para mantener la actual)'}
        </label>
        <input
          id="imagen"
          type="file"
          accept={tiposDeImagen.join(',')}
          className={`form-control ${errores.imagen ? 'is-invalid' : ''}`}
          onChange={(evento) => setImagen(evento.target.files[0] ?? null)}
        />
        <div className="form-text">JPG, PNG o WEBP, hasta 2 MB.</div>
        {errores.imagen && <div className="invalid-feedback">{errores.imagen}</div>}
      </div>

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
