// Solo deja pasar a administradores
export function requiereAdmin(req, res, next) {
  if (!req.usuario) {
    return res.status(401).json({ error: 'Tenés que iniciar sesión' })
  }
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ error: 'Solo el administrador puede hacer esto' })
  }
  next()
}
