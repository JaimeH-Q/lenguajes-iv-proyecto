import db from '../db/conexion.js'

export function obtenerTodos() {
  return db.prepare('select * from proyectos order by fechaAlta desc').all()
}

export function obtenerPorId(id) {
  return db.prepare('select * from proyectos where id = ?').get(id)
}

export function crear({ titulo, descripcion, tecnologias, imagen, linkRepo }) {
  const resultado = db
    .prepare(
      'insert into proyectos (titulo, descripcion, tecnologias, imagen, linkRepo) values (?, ?, ?, ?, ?)',
    )
    .run(titulo, descripcion, tecnologias, imagen ?? null, linkRepo || null)
  return obtenerPorId(resultado.lastInsertRowid)
}

export function actualizar(id, { titulo, descripcion, tecnologias, imagen, linkRepo }) {
  db
    .prepare(
      `update proyectos
       set titulo = ?, descripcion = ?, tecnologias = ?, imagen = ?, linkRepo = ?
       where id = ?`,
    )
    .run(titulo, descripcion, tecnologias, imagen ?? null, linkRepo || null, id)
  return obtenerPorId(id)
}

export function eliminar(id) {
  return db.prepare('delete from proyectos where id = ?').run(id).changes > 0
}

export function contarTodos() {
  return db.prepare('select count(*) as cantidad from proyectos').get().cantidad
}
