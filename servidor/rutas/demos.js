// Demos: las ven los usuarios registrados, las administra el admin
import { Router } from 'express'
import * as demos from '../modelos/demos.js'
import * as proyectos from '../modelos/proyectos.js'
import { requiereLogin } from '../middlewares/requiereLogin.js'
import { requiereAdmin } from '../middlewares/requiereAdmin.js'
import { validarDemo, hayErrores } from '../../compartido/validaciones.js'

const rutasDemos = Router()

function limpiarDatos(cuerpo) {
  return {
    proyectoId: Number(cuerpo.proyectoId),
    titulo: String(cuerpo.titulo ?? '').trim(),
    descripcion: String(cuerpo.descripcion ?? '').trim(),
    linkDemo: String(cuerpo.linkDemo ?? '').trim(),
  }
}

function validarTodo(datos) {
  const errores = validarDemo(datos)
  if (!errores.proyectoId && !proyectos.obtenerPorId(datos.proyectoId)) {
    errores.proyectoId = 'Ese proyecto no existe'
  }
  return errores
}

rutasDemos.get('/', requiereLogin, (req, res) => {
  res.json(demos.obtenerTodas())
})

rutasDemos.post('/', requiereAdmin, (req, res) => {
  const datos = limpiarDatos(req.body ?? {})
  const errores = validarTodo(datos)
  if (hayErrores(errores)) {
    return res.status(400).json({ error: 'Revisá los datos', errores })
  }
  res.status(201).json(demos.crear(datos))
})

rutasDemos.put('/:id', requiereAdmin, (req, res) => {
  const id = Number(req.params.id)
  if (!demos.obtenerPorId(id)) {
    return res.status(404).json({ error: 'No existe esa demo' })
  }
  const datos = limpiarDatos(req.body ?? {})
  const errores = validarTodo(datos)
  if (hayErrores(errores)) {
    return res.status(400).json({ error: 'Revisá los datos', errores })
  }
  res.json(demos.actualizar(id, datos))
})

rutasDemos.delete('/:id', requiereAdmin, (req, res) => {
  if (!demos.eliminar(Number(req.params.id))) {
    return res.status(404).json({ error: 'No existe esa demo' })
  }
  res.json({ ok: true })
})

export default rutasDemos
