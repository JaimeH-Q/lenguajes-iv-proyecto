// Alerta verde. Si no hay mensaje, no muestra nada.
export function AlertaExito({ mensaje }) {
  if (!mensaje) return null
  return <div className="alert alert-success">{mensaje}</div>
}
