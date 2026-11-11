// Los servicios que ofrece el desarrollador (desarrollo web, APIs, asesoría, etc.)
import db from '../db/conexion.js'

export function obtenerTodos() {
  return db.prepare('select * from servicios order by id').all()
}

export function obtenerPorId(id) {
  return db.prepare('select * from servicios where id = ?').get(id)
}

export function crear({ nombre, descripcion, precioDesde }) {
  const resultado = db
    .prepare('insert into servicios (nombre, descripcion, precioDesde) values (?, ?, ?)')
    .run(nombre, descripcion, precioDesde)
  return obtenerPorId(resultado.lastInsertRowid)
}

export function actualizar(id, { nombre, descripcion, precioDesde }) {
  db
    .prepare('update servicios set nombre = ?, descripcion = ?, precioDesde = ? where id = ?')
    .run(nombre, descripcion, precioDesde, id)
  return obtenerPorId(id)
}

export function eliminar(id) {
  return db.prepare('delete from servicios where id = ?').run(id).changes > 0
}
