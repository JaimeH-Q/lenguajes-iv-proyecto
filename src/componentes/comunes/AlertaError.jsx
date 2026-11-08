// Alerta roja. Si no hay mensaje, no muestra nada.
export function AlertaError({ mensaje }) {
  if (!mensaje) return null
  return <div className="alert alert-danger">{mensaje}</div>
}
