// Crea las tablas si todavía no existen.
import db from './conexion.js'

export function crearTablas() {
  db.exec(`
    create table if not exists usuarios (
      id integer primary key autoincrement,
      nombre text not null,
      email text not null unique,
      clave text not null,
      rol text not null default 'usuario',
      fechaAlta text not null default (datetime('now', 'localtime')),
      vecesQueEntro integer not null default 0,
      ultimaVez text
    );

    create table if not exists sesiones (
      token text primary key,
      usuarioId integer not null references usuarios(id) on delete cascade,
      fecha text not null default (datetime('now', 'localtime'))
    );

    create table if not exists proyectos (
      id integer primary key autoincrement,
      titulo text not null,
      descripcion text not null,
      tecnologias text not null,
      imagen text,
      linkRepo text,
      fechaAlta text not null default (datetime('now', 'localtime'))
    );

    create table if not exists demos (
      id integer primary key autoincrement,
      proyectoId integer not null references proyectos(id) on delete cascade,
      titulo text not null,
      descripcion text not null,
      linkDemo text not null
    );

    create table if not exists servicios (
      id integer primary key autoincrement,
      nombre text not null,
      descripcion text not null,
      precioDesde real not null default 0
    );

    create table if not exists consultas (
      id integer primary key autoincrement,
      nombre text not null,
      email text not null,
      tipo text not null,
      mensaje text not null,
      estado text not null default 'pendiente',
      fecha text not null default (datetime('now', 'localtime'))
    );

    create table if not exists correos (
      id integer primary key autoincrement,
      para text not null,
      asunto text not null,
      texto text not null,
      consultaId integer references consultas(id) on delete set null,
      fecha text not null default (datetime('now', 'localtime'))
    );

    create table if not exists visitas (
      id integer primary key autoincrement,
      usuarioId integer references usuarios(id) on delete set null,
      fecha text not null default (datetime('now', 'localtime'))
    );
  `)
}
