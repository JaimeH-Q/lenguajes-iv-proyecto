// Gestión de usuarios (solo admin): listar, cambiar rol y eliminar
import { Router } from 'express'
import * as usuarios from '../modelos/usuarios.js'
import { requiereAdmin } from '../middlewares/requiereAdmin.js'
import { roles } from '../../compartido/validaciones.js'

const rutasUsuarios = Router()

rutasUsuarios.use(requiereAdmin)

rutasUsuarios.get('/', (req, res) => {
  res.json(usuarios.obtenerTodos())
})

rutasUsuarios.put('/:id/rol', (req, res) => {
  const id = Number(req.params.id)
  const rol = req.body?.rol

  if (!roles.includes(rol)) {
    return res.status(400).json({ error: 'Ese rol no existe' })
  }
  if (id === req.usuario.id) {
    return res.status(400).json({ error: 'No te podés actualizar el rol a vos mismo' })
  }
  if (!usuarios.obtenerPorId(id)) {
    return res.status(404).json({ error: 'No existe ese usuario' })
  }
  res.json(usuarios.actualizarRol(id, rol))
})

rutasUsuarios.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  if (id === req.usuario.id) {
    return res.status(400).json({ error: 'No te podés eliminar a vos mismo' })
  }
  if (!usuarios.eliminar(id)) {
    return res.status(404).json({ error: 'No existe ese usuario' })
  }
  res.json({ ok: true })
})

export default rutasUsuarios
