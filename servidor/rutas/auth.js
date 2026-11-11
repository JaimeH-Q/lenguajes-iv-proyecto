// Registro, login, logout y datos del usuario actual
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import * as usuarios from '../modelos/usuarios.js'
import * as sesiones from '../modelos/sesiones.js'
import * as visitas from '../modelos/visitas.js'
import { requiereLogin } from '../middlewares/requiereLogin.js'
import { validarRegistro, validarLogin, hayErrores } from '../../compartido/validaciones.js'

const router = Router()

function datosPublicos(usuario) {
  return { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }
}

router.post('/registro', (req, res) => {
  const datos = req.body ?? {}
  const errores = validarRegistro(datos)
  if (hayErrores(errores)) {
    return res.status(400).json({ error: 'Revisá los datos', errores })
  }

  const email = datos.email.trim().toLowerCase()
  if (usuarios.buscarPorEmail(email)) {
    return res
      .status(400)
      .json({ error: 'Ya hay una cuenta con ese email', errores: { email: 'Ya hay una cuenta con ese email' } })
  }

  const usuario = usuarios.crear({
    nombre: datos.nombre.trim(),
    email,
    clave: bcrypt.hashSync(datos.clave, 10),
    rol: 'usuario',
  })

  usuarios.registrarLogin(usuario.id)
  visitas.registrar(usuario.id)
  const token = sesiones.crear(usuario.id)
  res.status(201).json({ token, usuario: datosPublicos(usuario) })
})

router.post('/login', (req, res) => {
  const datos = req.body ?? {}
  const errores = validarLogin(datos)
  if (hayErrores(errores)) {
    return res.status(400).json({ error: 'Revisá los datos', errores })
  }

  const usuario = usuarios.buscarPorEmail(datos.email.trim().toLowerCase())
  if (!usuario || !bcrypt.compareSync(datos.clave, usuario.clave)) {
    return res.status(400).json({ error: 'El email o la clave no son correctos' })
  }

  usuarios.registrarLogin(usuario.id)
  visitas.registrar(usuario.id)
  const token = sesiones.crear(usuario.id)
  res.json({ token, usuario: datosPublicos(usuario) })
})

router.post('/logout', (req, res) => {
  if (req.token) sesiones.eliminar(req.token)
  res.json({ ok: true })
})

router.get('/yo', requiereLogin, (req, res) => {
  res.json({ usuario: req.usuario })
})

export default router
