import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useSesion } from '../../contexto/useSesion.js'
import { CampoFormulario } from '../../componentes/comunes/CampoFormulario.jsx'
import { AlertaError } from '../../componentes/comunes/AlertaError.jsx'
import { validarLogin, hayErrores } from '../../../compartido/validaciones.js'

export function Login() {
  const { login } = useSesion()
  const navigate = useNavigate()
  const location = useLocation()
  const [datos, setDatos] = useState({ email: '', clave: '' })
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [entrando, setEntrando] = useState(false)

  function manejarCambio(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value })
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setErrorGeneral('')

    const erroresEncontrados = validarLogin(datos)
    setErrores(erroresEncontrados)
    if (hayErrores(erroresEncontrados)) return

    setEntrando(true)
    try {
      const usuario = await login(datos)
      // Si venía redirigido desde otra página, vuelve a esa página
      const volverA = location.state?.volverA
      if (volverA) navigate(volverA)
      else if (usuario.rol === 'usuario') navigate('/proyectos')
      else navigate('/admin')
    } catch (error) {
      setErrorGeneral(error.message)
      setErrores(error.errores ?? {})
      setEntrando(false)
    }
  }

  return (
    <section className="py-5 col-12 col-md-8 col-lg-5 mx-auto">
      <div className="vidrio vidrioFuerte tarjetaFormulario">
      <h1 className="h3 mb-4">Iniciar sesión</h1>
      <AlertaError mensaje={errorGeneral} />
      <form onSubmit={manejarEnvio} noValidate>
        <CampoFormulario etiqueta="Email" nombre="email" tipo="email" valor={datos.email} onChange={manejarCambio} error={errores.email} />
        <CampoFormulario etiqueta="Clave" nombre="clave" tipo="password" valor={datos.clave} onChange={manejarCambio} error={errores.clave} />
        <button type="submit" className="btn btn-primary w-100" disabled={entrando}>
          {entrando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
      <p className="mt-3 small">
        ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
      </p>
      </div>
    </section>
  )
}
