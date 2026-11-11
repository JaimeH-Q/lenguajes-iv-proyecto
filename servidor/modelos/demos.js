import db from '../db/conexion.js'

// Traemos también el título del proyecto para mostrarlo en las listas
const consultaConProyecto = `
  select demos.*, proyectos.titulo as tituloProyecto
  from demos join proyectos on proyectos.id = demos.proyectoId
`

export function obtenerTodas() {
  return db.prepare(`${consultaConProyecto} order by demos.id desc`).all()
}

export function obtenerPorProyecto(proyectoId) {
  return db.prepare(`${consultaConProyecto} where demos.proyectoId = ? order by demos.id`).all(proyectoId)
}

export function obtenerPorId(id) {
  return db.prepare(`${consultaConProyecto} where demos.id = ?`).get(id)
}

export function crear({ proyectoId, titulo, descripcion, linkDemo }) {
  const resultado = db
    .prepare('insert into demos (proyectoId, titulo, descripcion, linkDemo) values (?, ?, ?, ?)')
    .run(proyectoId, titulo, descripcion, linkDemo)
  return obtenerPorId(resultado.lastInsertRowid)
}

export function actualizar(id, { proyectoId, titulo, descripcion, linkDemo }) {
  db
    .prepare('update demos set proyectoId = ?, titulo = ?, descripcion = ?, linkDemo = ? where id = ?')
    .run(proyectoId, titulo, descripcion, linkDemo, id)
  return obtenerPorId(id)
}

export function eliminar(id) {
  return db.prepare('delete from demos where id = ?').run(id).changes > 0
}
