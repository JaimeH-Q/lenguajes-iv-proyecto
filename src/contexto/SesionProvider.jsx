// Envuelve toda la app y guarda quién está logueado.
import { useEffect, useState } from 'react'
import { SesionContext } from './SesionContext.js'
import * as auth from '../api/auth.js'
import { obtenerToken, guardarToken, borrarToken } from '../api/token.js'

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(() => Boolean(obtenerToken()))

  // Al abrir la página, si hay un token guardado, buscamos de quién es
  useEffect(() => {
    if (!obtenerToken()) return
    auth
      .obtenerUsuarioActual()
      .then((respuesta) => setUsuario(respuesta.usuario))
      .catch(() => borrarToken())
      .finally(() => setCargando(false))
  }, [])

  async function login(datos) {
    const respuesta = await auth.login(datos)
    guardarToken(respuesta.token)
    setUsuario(respuesta.usuario)
    return respuesta.usuario
  }

  async function registrar(datos) {
    const respuesta = await auth.registrar(datos)
    guardarToken(respuesta.token)
    setUsuario(respuesta.usuario)
    return respuesta.usuario
  }

  async function logout() {
    await auth.logout().catch(() => {})
    borrarToken()
    setUsuario(null)
  }

  const valor = {
    usuario,
    cargando,
    estaLogueado: Boolean(usuario),
    esOperador: usuario?.rol === 'operador' || usuario?.rol === 'admin',
    esAdmin: usuario?.rol === 'admin',
    login,
    registrar,
    logout,
  }

  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>
}
