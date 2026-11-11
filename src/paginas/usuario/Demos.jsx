import { useEffect, useState } from 'react'
import { obtenerDemos } from '../../api/demos.js'
import { TarjetaDemo } from '../../componentes/proyectos/TarjetaDemo.jsx'
import { Cargando } from '../../componentes/comunes/Cargando.jsx'
import { AlertaError } from '../../componentes/comunes/AlertaError.jsx'

export function Demos() {
  const [demos, setDemos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerDemos()
      .then(setDemos)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false))
  }, [])

  return (
    <section className="py-5">
      <h1 className="mb-4">Demos</h1>
      <AlertaError mensaje={error} />
      {cargando ? (
        <Cargando />
      ) : (
        <div className="row g-3">
          {demos.map((demo) => (
            <div className="col-12 col-md-6 col-lg-4" key={demo.id}>
              <TarjetaDemo demo={demo} mostrarProyecto />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
