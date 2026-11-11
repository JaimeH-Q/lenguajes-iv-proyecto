import { peticion } from './cliente.js'

// Listado resumido (público)
export function obtenerProyectos() {
  return peticion('/proyectos')
}

// Listado completo (panel de admin)
export function obtenerProyectosCompletos() {
  return peticion('/proyectos/completos')
}

// Detalle de un proyecto con sus demos (solo registrados)
export function obtenerProyecto(id) {
  return peticion(`/proyectos/${id}`)
}

// "formulario" es un FormData porque lleva la imagen
export function crearProyecto(formulario) {
  return peticion('/proyectos', { metodo: 'POST', datos: formulario })
}

export function actualizarProyecto(id, formulario) {
  return peticion(`/proyectos/${id}`, { metodo: 'PUT', datos: formulario })
}

export function eliminarProyecto(id) {
  return peticion(`/proyectos/${id}`, { metodo: 'DELETE' })
}
