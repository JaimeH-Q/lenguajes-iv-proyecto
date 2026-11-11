import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useSesion } from '../../contexto/useSesion.js'
import { obtenerProyectos } from '../../api/proyectos.js'
import { TarjetaProyecto } from '../../componentes/proyectos/TarjetaProyecto.jsx'
import { Cargando } from '../../componentes/comunes/Cargando.jsx'
import { AlertaError } from '../../componentes/comunes/AlertaError.jsx'

export function Proyectos() {
  const { estaLogueado } = useSesion()
  const [proyectos, setProyectos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerProyectos()
      .then(setProyectos)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false))
  }, [])

  return (
    <section className="py-5">
      <h1 className="mb-3">Proyectos</h1>
      {!estaLogueado && (
        <div className="alert alert-info">
          Para ver el detalle de cada proyecto y probar las demos tenés que <Link to="/registro">registrarte</Link>{' '}
          o <Link to="/login">iniciar sesión</Link>.
        </div>
      )}
      <AlertaError mensaje={error} />
      {cargando ? (
        <Cargando />
      ) : (
        <div className="row g-3">
          {proyectos.map((proyecto) => (
            <div className="col-12 col-md-6 col-lg-4" key={proyecto.id}>
              <TarjetaProyecto proyecto={proyecto} puedeVerDetalle={estaLogueado} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
