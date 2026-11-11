// Solo deja pasar a usuarios logueados (cualquier rol)
export function requiereLogin(req, res, next) {
  if (!req.usuario) {
    return res.status(401).json({ error: 'Tenés que iniciar sesión para ver esto' })
  }
  next()
}
