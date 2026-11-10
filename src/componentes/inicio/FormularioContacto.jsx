// Formulario de contacto. Valida los datos antes de enviar
// y recibe en "onEnviar" la función que los manda al servidor.
import { useState } from 'react'
import { LuMail, LuMapPin, LuClock, LuSend } from 'react-icons/lu'
import { CampoFormulario } from '../comunes/CampoFormulario.jsx'
import { AlertaError } from '../comunes/AlertaError.jsx'
import { AlertaExito } from '../comunes/AlertaExito.jsx'
import { TituloSeccion } from '../comunes/TituloSeccion.jsx'
import { validarConsulta, hayErrores, tiposDeConsulta } from '../../../compartido/validaciones.js'
import { nombresDeTipos } from '../../utilidades/formatos.js'
import { perfil } from '../../datos/perfil.js'

const formularioVacio = { nombre: '', email: '', tipo: '', mensaje: '' }

export function FormularioContacto({ onEnviar }) {
  const [datos, setDatos] = useState(formularioVacio)
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [exito, setExito] = useState('')
  const [enviando, setEnviando] = useState(false)

  function manejarCambio(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value })
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setExito('')
    setErrorGeneral('')

    const erroresEncontrados = validarConsulta(datos)
    setErrores(erroresEncontrados)
    if (hayErrores(erroresEncontrados)) return

    setEnviando(true)
    try {
      await onEnviar(datos)
      setExito('Consulta enviada. Te respondo por email a la brevedad.')
      setDatos(formularioVacio)
    } catch (err) {
      setErrorGeneral(err.message)
      setErrores(err.errores ?? {})
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section id="contacto" className="seccion">
      <TituloSeccion
        centrado
        titulo="Hablemos de tu proyecto"
        descripcion="Contame qué necesitás y te respondo con una propuesta. Sin compromiso."
      />

      <div className="contenedorContacto">
        <div className="vidrio tarjetaContacto">
          <div className="datosContacto">
            <span className="datoContacto">
              <LuMail /> {perfil.email}
            </span>
            <span className="datoContacto">
              <LuMapPin /> {perfil.ciudad}
            </span>
            <span className="datoContacto">
              <LuClock /> {perfil.tiempoDeRespuesta}
            </span>
          </div>

          <AlertaExito mensaje={exito} />
          <AlertaError mensaje={errorGeneral} />

          <form onSubmit={manejarEnvio} noValidate>
            <div className="row">
              <div className="col-12 col-md-6">
                <CampoFormulario
                  etiqueta="Nombre"
                  nombre="nombre"
                  placeholder="Cómo te llamás"
                  valor={datos.nombre}
                  onChange={manejarCambio}
                  error={errores.nombre}
                />
              </div>
              <div className="col-12 col-md-6">
                <CampoFormulario
                  etiqueta="Email"
                  nombre="email"
                  tipo="email"
                  placeholder="tu@email.com"
                  valor={datos.email}
                  onChange={manejarCambio}
                  error={errores.email}
                />
              </div>
            </div>

            <fieldset className="mb-3">
              <legend className="form-label">¿Qué necesitás?</legend>
              <div className={`opcionesTipo ${errores.tipo ? 'conError' : ''}`}>
                {tiposDeConsulta.map((tipo) => (
                  <span key={tipo}>
                    <input
                      type="radio"
                      id={`tipo${tipo}`}
                      name="tipo"
                      value={tipo}
                      checked={datos.tipo === tipo}
                      onChange={manejarCambio}
                    />
                    <label htmlFor={`tipo${tipo}`}>{nombresDeTipos[tipo]}</label>
                  </span>
                ))}
              </div>
              {errores.tipo && <div className="errorCampo">{errores.tipo}</div>}
            </fieldset>

            <CampoFormulario
              etiqueta="Mensaje"
              nombre="mensaje"
              elemento="textarea"
              placeholder="Contame sobre tu proyecto, plazos y lo que tengas en mente"
              valor={datos.mensaje}
              onChange={manejarCambio}
              error={errores.mensaje}
              rows={5}
            />

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 d-inline-flex justify-content-center align-items-center gap-2"
              disabled={enviando}
            >
              <LuSend /> {enviando ? 'Enviando...' : 'Enviar consulta'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
