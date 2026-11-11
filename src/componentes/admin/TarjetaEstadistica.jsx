// Tarjeta con un número y su título, para el dashboard
export function TarjetaEstadistica({ titulo, numero, aclaracion }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <p className="text-secondary small mb-1">{titulo}</p>
        <p className="numeroEstadistica mb-0">{numero}</p>
        {aclaracion && <p className="text-secondary small mb-0">{aclaracion}</p>}
      </div>
    </div>
  )
}
