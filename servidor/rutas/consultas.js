// Consultas del formulario de contacto.
// Cualquiera puede enviar una; el operador (o el admin) las ve y las responde.
import { Router } from 'express'
import * as consultas from '../modelos/consultas.js'
import * as correos from '../modelos/correos.js'
import { enviarCorreo } from '../servicios/correo.js'
import { emailDelSitio } from '../config.js'
import { requiereOperador } from '../middlewares/requiereOperador.js'
import { requiereAdmin } from '../middlewares/requiereAdmin.js'
import {
  validarConsulta,
  validarRespuesta,
  hayErrores,
  tiposDeConsulta,
  estadosDeConsulta,
} from '../../compartido/validaciones.js'

const rutasConsultas = Router()

const nombresDeTipos = {
  general: 'Consulta general',
  cotizacion: 'Cotización de proyecto',
  asesoria: 'Asesoría técnica',
}

rutasConsultas.post('/', (req, res) => {
  const cuerpo = req.body ?? {}
  const datos = {
    nombre: String(cuerpo.nombre ?? '').trim(),
    email: String(cuerpo.email ?? '').trim().toLowerCase(),
    tipo: cuerpo.tipo,
    mensaje: String(cuerpo.mensaje ?? '').trim(),
  }
  const errores = validarConsulta(datos)
  if (hayErrores(errores)) {
    return res.status(400).json({ error: 'Revisá los datos', errores })
  }

  const consulta = consultas.crear(datos)

  // Aviso al dueño del sitio y confirmación a quien escribió
  enviarCorreo({
    para: emailDelSitio,
    asunto: `Nueva consulta: ${nombresDeTipos[consulta.tipo]}`,
    texto: `${consulta.nombre} (${consulta.email}) escribió:\n\n${consulta.mensaje}`,
    consultaId: consulta.id,
  })
  enviarCorreo({
    para: consulta.email,
    asunto: 'Recibimos tu consulta',
    texto: `Hola ${consulta.nombre}, gracias por escribir. Te vamos a responder lo antes posible.\n\nTu mensaje:\n${consulta.mensaje}`,
    consultaId: consulta.id,
  })

  res.status(201).json({ ok: true })
})

// Las rutas de abajo son solo para operador o admin
rutasConsultas.get('/', requiereOperador, (req, res) => {
  const tipo = tiposDeConsulta.includes(req.query.tipo) ? req.query.tipo : undefined
  const estado = estadosDeConsulta.includes(req.query.estado) ? req.query.estado : undefined
  res.json(consultas.obtenerTodas({ tipo, estado }))
})

rutasConsultas.get('/:id', requiereOperador, (req, res) => {
  const consulta = consultas.obtenerPorId(Number(req.params.id))
  if (!consulta) {
    return res.status(404).json({ error: 'No existe esa consulta' })
  }
  // Se incluyen los correos de la consulta para ver el seguimiento
  res.json({ ...consulta, correos: correos.obtenerPorConsulta(consulta.id) })
})

rutasConsultas.post('/:id/responder', requiereOperador, (req, res) => {
  const consulta = consultas.obtenerPorId(Number(req.params.id))
  if (!consulta) {
    return res.status(404).json({ error: 'No existe esa consulta' })
  }

  const datos = {
    asunto: String(req.body?.asunto ?? '').trim(),
    texto: String(req.body?.texto ?? '').trim(),
  }
  const errores = validarRespuesta(datos)
  if (hayErrores(errores)) {
    return res.status(400).json({ error: 'Revisá los datos', errores })
  }

  enviarCorreo({ para: consulta.email, asunto: datos.asunto, texto: datos.texto, consultaId: consulta.id })
  consultas.actualizarEstado(consulta.id, 'respondida')

  res.json({ ...consultas.obtenerPorId(consulta.id), correos: correos.obtenerPorConsulta(consulta.id) })
})

rutasConsultas.put('/:id/estado', requiereOperador, (req, res) => {
  const id = Number(req.params.id)
  const estado = req.body?.estado
  if (!estadosDeConsulta.includes(estado)) {
    return res.status(400).json({ error: 'Ese estado no existe' })
  }
  if (!consultas.obtenerPorId(id)) {
    return res.status(404).json({ error: 'No existe esa consulta' })
  }
  consultas.actualizarEstado(id, estado)
  res.json({ ...consultas.obtenerPorId(id), correos: correos.obtenerPorConsulta(id) })
})

rutasConsultas.delete('/:id', requiereAdmin, (req, res) => {
  if (!consultas.eliminar(Number(req.params.id))) {
    return res.status(404).json({ error: 'No existe esa consulta' })
  }
  res.json({ ok: true })
})

export default rutasConsultas
