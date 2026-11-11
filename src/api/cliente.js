// Función base para hacer peticiones al servidor.
// Todos los demás archivos de la carpeta api la usan.
import { obtenerToken } from './token.js'

export async function peticion(ruta, { metodo = 'GET', datos } = {}) {
  const headers = {}
  const token = obtenerToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let body
  if (datos instanceof FormData) {
    // Formularios con archivos (imágenes): el navegador arma el body solo
    body = datos
  } else if (datos !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(datos)
  }

  let respuesta
  try {
    respuesta = await fetch(`/api${ruta}`, { method: metodo, headers, body })
  } catch {
    throw new Error('No se pudo conectar con el servidor. ¿Está corriendo?')
  }

  const contenido = await respuesta.json().catch(() => ({}))

  if (!respuesta.ok) {
    const error = new Error(contenido.error ?? 'Algo salió mal')
    error.errores = contenido.errores ?? {}
    error.codigo = respuesta.status
    throw error
  }

  return contenido
}
