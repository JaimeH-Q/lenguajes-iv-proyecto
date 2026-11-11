// Estadísticas y datos para los gráficos del dashboard.
// Se puede filtrar por fechas: /api/estadisticas?desde=2026-10-01&hasta=2026-10-21
// Si no vienen fechas, se usan los últimos 14 días.
import { Router } from 'express'
import * as visitas from '../modelos/visitas.js'
import * as usuarios from '../modelos/usuarios.js'
import * as consultas from '../modelos/consultas.js'
import * as proyectos from '../modelos/proyectos.js'
import { requiereAdmin } from '../middlewares/requiereAdmin.js'

const rutasEstadisticas = Router()

function fechaComoTexto(fecha) {
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${anio}-${mes}-${dia}`
}

function esFecha(texto) {
  return /^\d{4}-\d{2}-\d{2}$/.test(texto ?? '')
}

rutasEstadisticas.get('/', requiereAdmin, (req, res) => {
  const hoy = new Date()
  const haceDosSemanas = new Date()
  haceDosSemanas.setDate(hoy.getDate() - 13)

  const desde = esFecha(req.query.desde) ? req.query.desde : fechaComoTexto(haceDosSemanas)
  const hasta = esFecha(req.query.hasta) ? req.query.hasta : fechaComoTexto(hoy)

  if (desde > hasta) {
    return res.status(400).json({ error: 'La fecha "desde" no puede ser después de "hasta"' })
  }

  res.json({
    desde,
    hasta,
    // Contadores generales (de toda la historia)
    visitasTotales: visitas.contarTodas(),
    visitasDeRegistrados: visitas.contarTodasDeRegistrados(),
    usuariosRegistrados: usuarios.contarTodos(),
    consultasPendientes: consultas.contarPendientes(),
    proyectos: proyectos.contarTodos(),
    // Lo que pasó entre las fechas elegidas
    visitasEnElRango: visitas.contarEntre(desde, hasta),
    visitasDeRegistradosEnElRango: visitas.contarDeRegistradosEntre(desde, hasta),
    visitasPorDia: visitas.porDia(desde, hasta),
    registrosPorDia: usuarios.registrosPorDia(desde, hasta),
    consultasPorTipo: consultas.contarPorTipo(desde, hasta),
  })
})

export default rutasEstadisticas
