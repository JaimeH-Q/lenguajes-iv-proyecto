import { peticion } from './cliente.js'

export function obtenerServicios() {
  return peticion('/servicios')
}

export function crearServicio(datos) {
  return peticion('/servicios', { metodo: 'POST', datos })
}

export function actualizarServicio(id, datos) {
  return peticion(`/servicios/${id}`, { metodo: 'PUT', datos })
}

export function eliminarServicio(id) {
  return peticion(`/servicios/${id}`, { metodo: 'DELETE' })
}
