import { peticion } from './cliente.js'

// desde y hasta en formato AAAA-MM-DD (opcionales)
export function obtenerEstadisticas(desde, hasta) {
  const parametros = new URLSearchParams()
  if (desde) parametros.set('desde', desde)
  if (hasta) parametros.set('hasta', hasta)
  const extra = parametros.toString() ? `?${parametros}` : ''
  return peticion(`/estadisticas${extra}`)
}
