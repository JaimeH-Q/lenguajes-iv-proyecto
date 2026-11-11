// Formulario para crear o editar un servicio ofrecido.
// Si recibe "servicio" es para editarlo; si no, es uno nuevo.
import { useState } from 'react'
import { CampoFormulario } from '../comunes/CampoFormulario.jsx'
import { AlertaError } from '../comunes/AlertaError.jsx'
import { validarServicio, hayErrores } from '../../../compartido/validaciones.js'

export function FormularioServicio({ servicio, onGuardar, onCancelar }) {
  const esNuevo = !servicio
  const [datos, setDatos] = useState({
    nombre: servicio?.nombre ?? '',
    descripcion: servicio?.descripcion ?? '',
    precioDesde: servicio ? String(servicio.precioDesde) : '',
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

    const erroresEncontrados = validarServicio(datos)
    setErrores(erroresEncontrados)
    if (hayErrores(erroresEncontrados)) return

    setGuardando(true)
    try {
      await onGuardar(datos)
    } catch (error) {
      setErrorGeneral(error.message)
      setErrores(error.errores ?? {})
    } finally {
      setGuardando(false)
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="card card-body mb-4">
      <h2 className="h5">{esNuevo ? 'Servicio nuevo' : `Cambiar "${servicio.nombre}"`}</h2>
      <AlertaError mensaje={errorGeneral} />
      <CampoFormulario etiqueta="Nombre" nombre="nombre" valor={datos.nombre} onChange={manejarCambio} error={errores.nombre} />
      <CampoFormulario etiqueta="Descripción" nombre="descripcion" elemento="textarea" valor={datos.descripcion} onChange={manejarCambio} error={errores.descripcion} />
      <CampoFormulario
        etiqueta="Precio desde ($)"
        nombre="precioDesde"
        tipo="number"
        min="0"
        valor={datos.precioDesde}
        onChange={manejarCambio}
        error={errores.precioDesde}
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
