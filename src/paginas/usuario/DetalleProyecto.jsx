import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { obtenerProyecto } from '../../api/proyectos.js'
import { TarjetaDemo } from '../../componentes/proyectos/TarjetaDemo.jsx'
import { Cargando } from '../../componentes/comunes/Cargando.jsx'
import { AlertaError } from '../../componentes/comunes/AlertaError.jsx'
import { urlImagen } from '../../utilidades/formatos.js'

export function DetalleProyecto() {
  const { id } = useParams()
  const [proyecto, setProyecto] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerProyecto(id)
      .then(setProyecto)
      .catch((err) => setError(err.message))
  }, [id])

  if (error) return <div className="py-5"><AlertaError mensaje={error} /></div>
  if (!proyecto) return <Cargando />

  const imagen = urlImagen(proyecto.imagen)

  return (
    <section className="py-5">
      <Link to="/proyectos" className="small">
        ← Volver a proyectos
      </Link>
      <div className="row g-4 mt-1">
        <div className="col-12 col-lg-6">
          {imagen ? (
            <img src={imagen} alt={proyecto.titulo} className="img-fluid rounded border" />
          ) : (
            <div className="imagenProyecto sinImagen rounded">Sin imagen</div>
          )}
        </div>
        <div className="col-12 col-lg-6">
          <h1>{proyecto.titulo}</h1>
          <div className="d-flex flex-wrap gap-1 mb-3">
            {proyecto.tecnologias.split(',').map((tecnologia) => (
              <span className="badge text-bg-secondary" key={tecnologia}>
                {tecnologia.trim()}
              </span>
            ))}
          </div>
          <p>{proyecto.descripcion}</p>
          {proyecto.linkRepo && (
            <a href={proyecto.linkRepo} target="_blank" rel="noreferrer" className="btn btn-outline-dark btn-sm">
              Ver repositorio
            </a>
          )}
        </div>
      </div>

      <h2 className="h4 mt-5 mb-3">Demos</h2>
      {proyecto.demos.length === 0 && <p className="text-secondary">Este proyecto todavía no tiene demos.</p>}
      <div className="row g-3">
        {proyecto.demos.map((demo) => (
          <div className="col-12 col-md-6 col-lg-4" key={demo.id}>
            <TarjetaDemo demo={demo} />
          </div>
        ))}
      </div>
    </section>
  )
}
