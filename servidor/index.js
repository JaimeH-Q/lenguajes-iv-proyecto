// Punto de entrada del servidor. Se corre con: npm run servidor
import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import { puerto, carpetaUploads, carpetaDist } from './config.js'
import { crearTablas } from './db/crearTablas.js'
import { cargarDatosDePrueba } from './db/datosDePrueba.js'
import { autenticar } from './middlewares/autenticar.js'
import rutasAuth from './rutas/auth.js'
import rutasUsuarios from './rutas/usuarios.js'
import rutasProyectos from './rutas/proyectos.js'
import rutasDemos from './rutas/demos.js'
import rutasServicios from './rutas/servicios.js'
import rutasConsultas from './rutas/consultas.js'
import rutasCorreos from './rutas/correos.js'
import rutasVisitas from './rutas/visitas.js'
import rutasEstadisticas from './rutas/estadisticas.js'

fs.mkdirSync(carpetaUploads, { recursive: true })
crearTablas()
cargarDatosDePrueba()

const app = express()

app.use(express.json())
app.use(autenticar)

// Las imágenes subidas quedan disponibles en /uploads/nombre.jpg
app.use('/uploads', express.static(carpetaUploads))

app.use('/api/auth', rutasAuth)
app.use('/api/usuarios', rutasUsuarios)
app.use('/api/proyectos', rutasProyectos)
app.use('/api/demos', rutasDemos)
app.use('/api/servicios', rutasServicios)
app.use('/api/consultas', rutasConsultas)
app.use('/api/correos', rutasCorreos)
app.use('/api/visitas', rutasVisitas)
app.use('/api/estadisticas', rutasEstadisticas)

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Esa ruta no existe' })
})

// Si ya se hizo "npm run build", el servidor también sirve el frontend
if (fs.existsSync(carpetaDist)) {
  app.use(express.static(carpetaDist))
  app.get('/{*cualquierRuta}', (req, res) => {
    res.sendFile(path.join(carpetaDist, 'index.html'))
  })
}

// Manejo de errores inesperados
app.use((error, req, res, next) => {
  console.error(error)
  if (res.headersSent) return next(error)
  res.status(500).json({ error: 'Algo salió mal en el servidor' })
})

app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`)
})
