// Borra la base de datos y las imágenes subidas para empezar de cero.
// Se corre con: npm run reiniciarBase
// La próxima vez que arranque el servidor se vuelven a cargar los datos de ejemplo.
import fs from 'node:fs'
import path from 'node:path'
import { rutaBaseDeDatos, carpetaUploads } from '../config.js'

for (const archivo of [rutaBaseDeDatos, `${rutaBaseDeDatos}-wal`, `${rutaBaseDeDatos}-shm`]) {
  fs.rmSync(archivo, { force: true })
}

if (fs.existsSync(carpetaUploads)) {
  for (const imagen of fs.readdirSync(carpetaUploads)) {
    if (imagen !== '.gitkeep') fs.rmSync(path.join(carpetaUploads, imagen), { force: true })
  }
}

console.log('Base de datos borrada. Al iniciar el servidor se vuelven a cargar los datos de prueba.')
