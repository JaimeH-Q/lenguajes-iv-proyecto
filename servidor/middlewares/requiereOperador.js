// Solo deja pasar a operadores y administradores
export function requiereOperador(req, res, next) {
  if (!req.usuario) {
    return res.status(401).json({ error: 'Tenés que iniciar sesión' })
  }
  if (req.usuario.rol !== 'operador' && req.usuario.rol !== 'admin') {
    return res.status(403).json({ error: 'No tenés permiso para esto' })
  }
  next()
}
