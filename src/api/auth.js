import { peticion } from './cliente.js'

export function registrar(datos) {
  return peticion('/auth/registro', { metodo: 'POST', datos })
}

export function login(datos) {
  return peticion('/auth/login', { metodo: 'POST', datos })
}

export function logout() {
  return peticion('/auth/logout', { metodo: 'POST' })
}

export function obtenerUsuarioActual() {
  return peticion('/auth/yo')
}
