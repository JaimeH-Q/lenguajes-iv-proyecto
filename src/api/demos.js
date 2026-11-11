import { peticion } from './cliente.js'

export function obtenerDemos() {
  return peticion('/demos')
}

export function crearDemo(datos) {
  return peticion('/demos', { metodo: 'POST', datos })
}

export function actualizarDemo(id, datos) {
  return peticion(`/demos/${id}`, { metodo: 'PUT', datos })
}

export function eliminarDemo(id) {
  return peticion(`/demos/${id}`, { metodo: 'DELETE' })
}
