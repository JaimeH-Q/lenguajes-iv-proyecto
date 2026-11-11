// Proyectos: el listado es público, el detalle es solo para registrados
// y el alta, la modificación y la baja son solo para el admin.
import fs from 'node:fs'
import path from 'node:path'
import { Router } from 'express'
import * as proyectos from '../modelos/proyectos.js'
import * as demos from '../modelos/demos.js'
import { carpetaUploads } from '../config.js'
import { requiereLogin } from '../middlewares/requiereLogin.js'
import { requiereAdmin } from '../middlewares/requiereAdmin.js'
import { subirImagen } from '../middlewares/subirImagen.js'
import { validarProyecto, hayErrores } from '../../compartido/validaciones.js'

const rutasProyectos = Router()

function borrarImagen(nombreImagen) {
  if (!nombreImagen) return
  fs.rm(path.join(carpetaUploads, nombreImagen), { force: true }, () => {})
}

function limpiarDatos(cuerpo) {
  return {
    titulo: String(cuerpo.titulo ?? '').trim(),
    descripcion: String(cuerpo.descripcion ?? '').trim(),
    tecnologias: String(cuerpo.tecnologias ?? '').trim(),
    linkRepo: String(cuerpo.linkRepo ?? '').trim(),
  }
}

// Listado público (sin la descripción completa)
rutasProyectos.get('/', (req, res) => {
  const lista = proyectos.obtenerTodos().map((proyecto) => ({
    id: proyecto.id,
    titulo: proyecto.titulo,
    tecnologias: proyecto.tecnologias,
    imagen: proyecto.imagen,
    resumen: proyecto.descripcion.slice(0, 120),
  }))
  res.json(lista)
})

// Listado completo para el panel de admin
rutasProyectos.get('/completos', requiereAdmin, (req, res) => {
  res.json(proyectos.obtenerTodos())
})

rutasProyectos.get('/:id', requiereLogin, (req, res) => {
  const proyecto = proyectos.obtenerPorId(Number(req.params.id))
  if (!proyecto) {
    return res.status(404).json({ error: 'No existe ese proyecto' })
  }
  res.json({ ...proyecto, demos: demos.obtenerPorProyecto(proyecto.id) })
})

rutasProyectos.post('/', requiereAdmin, subirImagen, (req, res) => {
  const datos = limpiarDatos(req.body ?? {})
  const errores = validarProyecto(datos)
  if (!req.file) errores.imagen = 'Falta la imagen'

  if (hayErrores(errores)) {
    borrarImagen(req.file?.filename)
    return res.status(400).json({ error: 'Revisá los datos', errores })
  }

  const proyecto = proyectos.crear({ ...datos, imagen: req.file.filename })
  res.status(201).json(proyecto)
})

rutasProyectos.put('/:id', requiereAdmin, subirImagen, (req, res) => {
  const anterior = proyectos.obtenerPorId(Number(req.params.id))
  if (!anterior) {
    borrarImagen(req.file?.filename)
    return res.status(404).json({ error: 'No existe ese proyecto' })
  }

  const datos = limpiarDatos(req.body ?? {})
  const errores = validarProyecto(datos)
  if (hayErrores(errores)) {
    borrarImagen(req.file?.filename)
    return res.status(400).json({ error: 'Revisá los datos', errores })
  }

  // Si viene una imagen nueva, se reemplaza y se borra la anterior
  const imagen = req.file ? req.file.filename : anterior.imagen
  if (req.file) borrarImagen(anterior.imagen)

  res.json(proyectos.actualizar(anterior.id, { ...datos, imagen }))
})

rutasProyectos.delete('/:id', requiereAdmin, (req, res) => {
  const proyecto = proyectos.obtenerPorId(Number(req.params.id))
  if (!proyecto) {
    return res.status(404).json({ error: 'No existe ese proyecto' })
  }
  proyectos.eliminar(proyecto.id)
  borrarImagen(proyecto.imagen)
  res.json({ ok: true })
})

export default rutasProyectos
