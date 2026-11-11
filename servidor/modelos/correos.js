// Correos enviados por el servicio de correo simulado (no se mandan de verdad, se guardan acá).
import db from '../db/conexion.js'

export function obtenerTodos() {
  return db.prepare('select * from correos order by fecha desc, id desc').all()
}

export function obtenerPorConsulta(consultaId) {
  return db.prepare('select * from correos where consultaId = ? order by fecha, id').all(consultaId)
}

export function obtenerPorId(id) {
  return db.prepare('select * from correos where id = ?').get(id)
}

export function crear({ para, asunto, texto, consultaId, fecha }) {
  const resultado = fecha
    ? db
        .prepare('insert into correos (para, asunto, texto, consultaId, fecha) values (?, ?, ?, ?, ?)')
        .run(para, asunto, texto, consultaId ?? null, fecha)
    : db
        .prepare('insert into correos (para, asunto, texto, consultaId) values (?, ?, ?, ?)')
        .run(para, asunto, texto, consultaId ?? null)
  return obtenerPorId(resultado.lastInsertRowid)
}
