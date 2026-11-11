// Sesiones: cuando alguien hace login se le crea un token.
// La página lo guarda y lo manda en cada petición para identificarse.
import crypto from 'node:crypto'
import db from '../db/conexion.js'

export function crear(usuarioId) {
  const token = crypto.randomBytes(24).toString('hex')
  db.prepare('insert into sesiones (token, usuarioId) values (?, ?)').run(token, usuarioId)
  return token
}

// Devuelve el usuario dueño del token (o undefined si el token no existe)
export function buscarUsuarioPorToken(token) {
  return db
    .prepare(
      `select usuarios.id, usuarios.nombre, usuarios.email, usuarios.rol
       from sesiones join usuarios on usuarios.id = sesiones.usuarioId
       where sesiones.token = ?`,
    )
    .get(token)
}

export function eliminar(token) {
  db.prepare('delete from sesiones where token = ?').run(token)
}
