import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSesion } from '../../contexto/useSesion.js'
import { CampoFormulario } from '../../componentes/comunes/CampoFormulario.jsx'
import { AlertaError } from '../../componentes/comunes/AlertaError.jsx'
import { validarRegistro, hayErrores } from '../../../compartido/validaciones.js'

export function Registro() {
  const { registrar } = useSesion()
  const navigate = useNavigate()
  const [datos, setDatos] = useState({ nombre: '', email: '', clave: '', repetirClave: '' })
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [guardando, setGuardando] = useState(false)

  function manejarCambio(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value })
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setErrorGeneral('')

    const erroresEncontrados = validarRegistro(datos)
    setErrores(erroresEncontrados)
    if (hayErrores(erroresEncontrados)) return

    setGuardando(true)
    try {
      await registrar(datos)
      navigate('/proyectos')
    } catch (error) {
      setErrorGeneral(error.message)
      setErrores(error.errores ?? {})
      setGuardando(false)
    }
  }

  return (
    <section className="py-5 col-12 col-md-8 col-lg-5 mx-auto">
      <div className="vidrio vidrioFuerte tarjetaFormulario">
      <h1 className="h3 mb-2">Crear cuenta</h1>
      <p className="text-secondary small mb-4">Con tu cuenta podés ver el detalle de los proyectos y probar las demos.</p>
      <AlertaError mensaje={errorGeneral} />
      <form onSubmit={manejarEnvio} noValidate>
        <CampoFormulario etiqueta="Nombre" nombre="nombre" valor={datos.nombre} onChange={manejarCambio} error={errores.nombre} />
        <CampoFormulario etiqueta="Email" nombre="email" tipo="email" valor={datos.email} onChange={manejarCambio} error={errores.email} />
        <CampoFormulario etiqueta="Clave" nombre="clave" tipo="password" valor={datos.clave} onChange={manejarCambio} error={errores.clave} />
        <CampoFormulario
          etiqueta="Repetí la clave"
          nombre="repetirClave"
          tipo="password"
          valor={datos.repetirClave}
          onChange={manejarCambio}
          error={errores.repetirClave}
        />
        <button type="submit" className="btn btn-primary w-100" disabled={guardando}>
          {guardando ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>
      <p className="mt-3 small">
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
      </div>
    </section>
  )
}
