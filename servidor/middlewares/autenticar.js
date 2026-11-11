// Se ejecuta en todas las peticiones.
// Si viene un token válido en la cabecera "Authorization: Bearer <token>",
// deja al usuario en req.usuario para que lo usen las rutas y los demás middlewares.
// No bloquea nada: eso lo hacen requiereLogin, requiereOperador y requiereAdmin.
import * as sesiones from '../modelos/sesiones.js'

export function autenticar(req, res, next) {
  const cabecera = req.get('authorization') ?? ''
  const token = cabecera.startsWith('Bearer ') ? cabecera.slice(7) : null

  if (token) {
    req.usuario = sesiones.buscarUsuarioPorToken(token) ?? null
    req.token = token
  }
  next()
}
