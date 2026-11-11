// mostrarProyecto: si es true, muestra a qué proyecto pertenece la demo
export function TarjetaDemo({ demo, mostrarProyecto = false }) {
  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h3 className="h6 card-title">{demo.titulo}</h3>
        {mostrarProyecto && <p className="small text-secondary mb-1">Proyecto: {demo.tituloProyecto}</p>}
        <p className="card-text">{demo.descripcion}</p>
        <div className="mt-auto">
          <a href={demo.linkDemo} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
            Abrir demo
          </a>
        </div>
      </div>
    </div>
  )
}
