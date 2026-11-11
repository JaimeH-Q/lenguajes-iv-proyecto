// Configuración general del servidor
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const carpetaServidor = path.dirname(fileURLToPath(import.meta.url))

export const puerto = 3001
export const rutaBaseDeDatos = path.join(carpetaServidor, 'db', 'datos.db')
export const carpetaUploads = path.join(carpetaServidor, 'uploads')
export const carpetaDist = path.join(carpetaServidor, '..', 'dist')

// Email del dueño del portfolio: le llegan los avisos de consultas nuevas
export const emailDelSitio = 'contacto@miportfolio.com'
