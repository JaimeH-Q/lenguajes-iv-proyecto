import { peticion } from './cliente.js'

export function obtenerUsuarios() {
  return peticion('/usuarios')
}

export function actualizarRol(id, rol) {
  return peticion(`/usuarios/${id}/rol`, { metodo: 'PUT', datos: { rol } })
}

export function eliminarUsuario(id) {
  return peticion(`/usuarios/${id}`, { metodo: 'DELETE' })
}
