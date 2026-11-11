import db from '../db/conexion.js'

// Trae las consultas, filtrando por tipo y/o estado si vienen
export function obtenerTodas({ tipo, estado } = {}) {
  const condiciones = []
  const valores = []
  if (tipo) {
    condiciones.push('tipo = ?')
    valores.push(tipo)
  }
  if (estado) {
    condiciones.push('estado = ?')
    valores.push(estado)
  }
  const donde = condiciones.length > 0 ? `where ${condiciones.join(' and ')}` : ''
  return db.prepare(`select * from consultas ${donde} order by fecha desc`).all(...valores)
}

export function obtenerPorId(id) {
  return db.prepare('select * from consultas where id = ?').get(id)
}

export function crear({ nombre, email, tipo, mensaje, fecha }) {
  const resultado = fecha
    ? db
        .prepare('insert into consultas (nombre, email, tipo, mensaje, fecha) values (?, ?, ?, ?, ?)')
        .run(nombre, email, tipo, mensaje, fecha)
    : db
        .prepare('insert into consultas (nombre, email, tipo, mensaje) values (?, ?, ?, ?)')
        .run(nombre, email, tipo, mensaje)
  return obtenerPorId(resultado.lastInsertRowid)
}

export function actualizarEstado(id, estado) {
  db.prepare('update consultas set estado = ? where id = ?').run(estado, id)
  return obtenerPorId(id)
}

export function eliminar(id) {
  return db.prepare('delete from consultas where id = ?').run(id).changes > 0
}

export function contarPendientes() {
  return db.prepare("select count(*) as cantidad from consultas where estado = 'pendiente'").get().cantidad
}

export function contarPorTipo(desde, hasta) {
  return db
    .prepare(
      `select tipo, count(*) as cantidad
       from consultas
       where date(fecha) between ? and ?
       group by tipo`,
    )
    .all(desde, hasta)
}
