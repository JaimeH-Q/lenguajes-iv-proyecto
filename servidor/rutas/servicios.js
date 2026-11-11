// Servicios ofrecidos: el listado es público, el resto es solo para el admin
import { Router } from 'express'
import * as servicios from '../modelos/servicios.js'
import { requiereAdmin } from '../middlewares/requiereAdmin.js'
import { validarServicio, hayErrores } from '../../compartido/validaciones.js'

const rutasServicios = Router()

function limpiarDatos(cuerpo) {
  return {
    nombre: String(cuerpo.nombre ?? '').trim(),
    descripcion: String(cuerpo.descripcion ?? '').trim(),
    precioDesde: String(cuerpo.precioDesde ?? '').trim(),
  }
}

rutasServicios.get('/', (req, res) => {
  res.json(servicios.obtenerTodos())
})

rutasServicios.post('/', requiereAdmin, (req, res) => {
  const datos = limpiarDatos(req.body ?? {})
  const errores = validarServicio(datos)
  if (hayErrores(errores)) {
    return res.status(400).json({ error: 'Revisá los datos', errores })
  }
  res.status(201).json(servicios.crear({ ...datos, precioDesde: Number(datos.precioDesde) }))
})

rutasServicios.put('/:id', requiereAdmin, (req, res) => {
  const id = Number(req.params.id)
  if (!servicios.obtenerPorId(id)) {
    return res.status(404).json({ error: 'No existe ese servicio' })
  }
  const datos = limpiarDatos(req.body ?? {})
  const errores = validarServicio(datos)
  if (hayErrores(errores)) {
    return res.status(400).json({ error: 'Revisá los datos', errores })
  }
  res.json(servicios.actualizar(id, { ...datos, precioDesde: Number(datos.precioDesde) }))
})

rutasServicios.delete('/:id', requiereAdmin, (req, res) => {
  if (!servicios.eliminar(Number(req.params.id))) {
    return res.status(404).json({ error: 'No existe ese servicio' })
  }
  res.json({ ok: true })
})

export default rutasServicios
