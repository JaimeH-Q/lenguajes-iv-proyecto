// Recibe una imagen que viene en el campo "imagen" del formulario.
// Solo acepta JPG, PNG o WEBP de hasta 2 MB, y la guarda en servidor/uploads.
import path from 'node:path'
import multer from 'multer'
import { carpetaUploads } from '../config.js'
import { tiposDeImagen, pesoMaximoImagen } from '../../compartido/validaciones.js'

const extensiones = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' }

const upload = multer({
  storage: multer.diskStorage({
    destination: carpetaUploads,
    filename(req, archivo, cb) {
      const nombre = `imagen${Date.now()}${Math.round(Math.random() * 1000)}${extensiones[archivo.mimetype]}`
      cb(null, nombre)
    },
  }),
  limits: { fileSize: pesoMaximoImagen },
  fileFilter(req, archivo, cb) {
    const extension = path.extname(archivo.originalname).toLowerCase()
    const extensionBien = ['.jpg', '.jpeg', '.png', '.webp'].includes(extension)
    if (!tiposDeImagen.includes(archivo.mimetype) || !extensionBien) {
      return cb(new Error('La imagen tiene que ser JPG, PNG o WEBP'))
    }
    cb(null, true)
  },
})

export function subirImagen(req, res, next) {
  upload.single('imagen')(req, res, (error) => {
    if (error) {
      const mensaje =
        error.code === 'LIMIT_FILE_SIZE' ? 'La imagen no puede pesar más de 2 MB' : error.message
      return res.status(400).json({ error: mensaje, errores: { imagen: mensaje } })
    }
    next()
  })
}
