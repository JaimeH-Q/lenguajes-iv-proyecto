// Se registra una visita cada vez que alguien abre el sitio o hace login.
// Si el visitante estaba logueado, se guarda su usuarioId.
import db from '../db/conexion.js'

export function registrar(usuarioId, fecha) {
  if (fecha) {
    db.prepare('insert into visitas (usuarioId, fecha) values (?, ?)').run(usuarioId ?? null, fecha)
  } else {
    db.prepare('insert into visitas (usuarioId) values (?)').run(usuarioId ?? null)
  }
}

export function contarEntre(desde, hasta) {
  return db
    .prepare('select count(*) as cantidad from visitas where date(fecha) between ? and ?')
    .get(desde, hasta).cantidad
}

export function contarDeRegistradosEntre(desde, hasta) {
  return db
    .prepare(
      'select count(*) as cantidad from visitas where usuarioId is not null and date(fecha) between ? and ?',
    )
    .get(desde, hasta).cantidad
}

export function contarTodas() {
  return db.prepare('select count(*) as cantidad from visitas').get().cantidad
}

export function contarTodasDeRegistrados() {
  return db.prepare('select count(*) as cantidad from visitas where usuarioId is not null').get().cantidad
}

export function porDia(desde, hasta) {
  return db
    .prepare(
      `select date(fecha) as dia,
              count(*) as total,
              sum(case when usuarioId is not null then 1 else 0 end) as deRegistrados
       from visitas
       where date(fecha) between ? and ?
       group by dia order by dia`,
    )
    .all(desde, hasta)
}
