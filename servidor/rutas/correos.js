// Correos enviados por el servicio de correo simulado. Solo los ve el admin.
import { Router } from 'express'
import * as correos from '../modelos/correos.js'
import { requiereAdmin } from '../middlewares/requiereAdmin.js'

const rutasCorreos = Router()

rutasCorreos.get('/', requiereAdmin, (req, res) => {
  res.json(correos.obtenerTodos())
})

export default rutasCorreos
