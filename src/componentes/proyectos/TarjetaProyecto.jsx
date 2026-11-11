import { Link } from 'react-router'
import { urlImagen } from '../../utilidades/formatos.js'

// puedeVerDetalle: si es false, en vez del botón "Ver detalle" invita a registrarse
export function TarjetaProyecto({ proyecto, puedeVerDetalle }) {
  const imagen = urlImagen(proyecto.imagen)

  return (
    <div className="card h-100">
      {imagen ? (
        <img src={imagen} className="card-img-top imagenProyecto" alt={proyecto.titulo} />
      ) : (
        <div className="card-img-top imagenProyecto sinImagen">Sin imagen</div>
      )}
      <div className="card-body d-flex flex-column">
        <h3 className="h5 card-title">{proyecto.titulo}</h3>
        <p className="card-text small text-secondary">{proyecto.tecnologias}</p>
        {proyecto.resumen && <p className="card-text">{proyecto.resumen}...</p>}
        <div className="mt-auto">
          {puedeVerDetalle ? (
            <Link to={`/proyectos/${proyecto.id}`} className="btn btn-primary btn-sm">
              Ver detalle y demos
            </Link>
          ) : (
            <Link to="/registro" className="btn btn-outline-primary btn-sm">
              Registrate para ver más
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
