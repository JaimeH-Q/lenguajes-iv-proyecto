import { peticion } from './cliente.js'

// Se envía desde el formulario de contacto (público)
export function enviarConsulta(datos) {
  return peticion('/consultas', { metodo: 'POST', datos })
}

// filtros: { tipo, estado } (los dos son opcionales)
export function obtenerConsultas(filtros = {}) {
  const parametros = new URLSearchParams()
  if (filtros.tipo) parametros.set('tipo', filtros.tipo)
  if (filtros.estado) parametros.set('estado', filtros.estado)
  const extra = parametros.toString() ? `?${parametros}` : ''
  return peticion(`/consultas${extra}`)
}

export function obtenerConsulta(id) {
  return peticion(`/consultas/${id}`)
}

export function responderConsulta(id, datos) {
  return peticion(`/consultas/${id}/responder`, { metodo: 'POST', datos })
}

export function actualizarEstadoConsulta(id, estado) {
  return peticion(`/consultas/${id}/estado`, { metodo: 'PUT', datos: { estado } })
}

export function eliminarConsulta(id) {
  return peticion(`/consultas/${id}`, { metodo: 'DELETE' })
}
