import db from '../db/conexion.js'

// Nunca devolvemos la clave, salvo en buscarPorEmail (que se usa en el login).
const columnasSinClave = 'id, nombre, email, rol, fechaAlta, vecesQueEntro, ultimaVez'

export function obtenerTodos() {
  return db.prepare(`select ${columnasSinClave} from usuarios order by fechaAlta desc`).all()
}

export function obtenerPorId(id) {
  return db.prepare(`select ${columnasSinClave} from usuarios where id = ?`).get(id)
}

export function buscarPorEmail(email) {
  return db.prepare('select * from usuarios where email = ?').get(email)
}

export function crear({ nombre, email, clave, rol = 'usuario', fechaAlta }) {
  const resultado = fechaAlta
    ? db
        .prepare('insert into usuarios (nombre, email, clave, rol, fechaAlta) values (?, ?, ?, ?, ?)')
        .run(nombre, email, clave, rol, fechaAlta)
    : db
        .prepare('insert into usuarios (nombre, email, clave, rol) values (?, ?, ?, ?)')
        .run(nombre, email, clave, rol)
  return obtenerPorId(resultado.lastInsertRowid)
}

export function actualizarRol(id, rol) {
  db.prepare('update usuarios set rol = ? where id = ?').run(rol, id)
  return obtenerPorId(id)
}

export function registrarLogin(id) {
  db
    .prepare(
      `update usuarios
       set vecesQueEntro = vecesQueEntro + 1, ultimaVez = datetime('now', 'localtime')
       where id = ?`,
    )
    .run(id)
}

export function eliminar(id) {
  return db.prepare('delete from usuarios where id = ?').run(id).changes > 0
}

export function contarTodos() {
  return db.prepare("select count(*) as cantidad from usuarios where rol = 'usuario'").get().cantidad
}

// Cuántos se registraron cada día entre dos fechas (formato AAAA-MM-DD)
export function registrosPorDia(desde, hasta) {
  return db
    .prepare(
      `select date(fechaAlta) as dia, count(*) as cantidad
       from usuarios
       where date(fechaAlta) between ? and ?
       group by dia order by dia`,
    )
    .all(desde, hasta)
}
