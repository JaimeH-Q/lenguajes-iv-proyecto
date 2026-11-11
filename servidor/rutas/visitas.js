// El frontend llama a esta ruta cada vez que alguien abre el sitio
import { Router } from 'express'
import * as visitas from '../modelos/visitas.js'

const rutasVisitas = Router()

rutasVisitas.post('/', (req, res) => {
  visitas.registrar(req.usuario?.id ?? null)
  res.status(201).json({ ok: true })
})

export default rutasVisitas
