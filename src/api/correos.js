import { peticion } from './cliente.js'

export function obtenerCorreos() {
  return peticion('/correos')
}
