// Contadores y gráficos para el admin, con filtro por fechas
import { useEffect, useState } from 'react'
import { obtenerEstadisticas } from '../../api/estadisticas.js'
import { TarjetaEstadistica } from '../../componentes/admin/TarjetaEstadistica.jsx'
import { Grafico } from '../../componentes/admin/Grafico.jsx'
import { Cargando } from '../../componentes/comunes/Cargando.jsx'
import { AlertaError } from '../../componentes/comunes/AlertaError.jsx'
import { fechaHoy, nombresDeTipos } from '../../utilidades/formatos.js'

export function Dashboard() {
  const [fechas, setFechas] = useState({ desde: fechaHoy(13), hasta: fechaHoy() })
  const [estadisticas, setEstadisticas] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerEstadisticas(fechas.desde, fechas.hasta)
      .then((respuesta) => {
        setEstadisticas(respuesta)
        setError('')
      })
      .catch((err) => setError(err.message))
  }, [fechas])

  function manejarCambioFecha(evento) {
    setFechas({ ...fechas, [evento.target.name]: evento.target.value })
  }

  return (
    <>
      <h1 className="h3 mb-3">Dashboard</h1>

      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <TarjetaEstadistica titulo="Visitas totales" numero={estadisticas?.visitasTotales ?? '-'} />
        </div>
        <div className="col-6 col-lg-3">
          <TarjetaEstadistica titulo="Visitas de registrados" numero={estadisticas?.visitasDeRegistrados ?? '-'} />
        </div>
        <div className="col-6 col-lg-3">
          <TarjetaEstadistica titulo="Usuarios registrados" numero={estadisticas?.usuariosRegistrados ?? '-'} />
        </div>
        <div className="col-6 col-lg-3">
          <TarjetaEstadistica titulo="Consultas pendientes" numero={estadisticas?.consultasPendientes ?? '-'} />
        </div>
      </div>

      <div className="card card-body mb-4">
        <div className="row g-2 align-items-end">
          <div className="col-6 col-md-4">
            <label className="form-label small" htmlFor="desde">
              Desde
            </label>
            <input id="desde" name="desde" type="date" className="form-control" value={fechas.desde} onChange={manejarCambioFecha} />
          </div>
          <div className="col-6 col-md-4">
            <label className="form-label small" htmlFor="hasta">
              Hasta
            </label>
            <input id="hasta" name="hasta" type="date" className="form-control" value={fechas.hasta} onChange={manejarCambioFecha} />
          </div>
          <div className="col-12 col-md-4 small text-secondary">
            {estadisticas && (
              <>
                En estas fechas: {estadisticas.visitasEnElRango} visitas, {estadisticas.visitasDeRegistradosEnElRango} de registrados.
              </>
            )}
          </div>
        </div>
      </div>

      <AlertaError mensaje={error} />
      {!estadisticas ? (
        <Cargando />
      ) : (
        <div className="row g-3">
          <div className="col-12">
            <Grafico
              tipo="linea"
              titulo="Visitas por día"
              etiquetas={estadisticas.visitasPorDia.map((fila) => fila.dia)}
              series={[
                { nombre: 'Todas', valores: estadisticas.visitasPorDia.map((fila) => fila.total) },
                { nombre: 'De registrados', valores: estadisticas.visitasPorDia.map((fila) => fila.deRegistrados) },
              ]}
            />
          </div>
          <div className="col-12 col-lg-6">
            <Grafico
              tipo="barras"
              titulo="Registros por día"
              etiquetas={estadisticas.registrosPorDia.map((fila) => fila.dia)}
              series={[{ nombre: 'Registros', valores: estadisticas.registrosPorDia.map((fila) => fila.cantidad) }]}
            />
          </div>
          <div className="col-12 col-lg-6">
            <Grafico
              tipo="torta"
              titulo="Consultas por tipo"
              etiquetas={estadisticas.consultasPorTipo.map((fila) => nombresDeTipos[fila.tipo])}
              series={[{ nombre: 'Consultas', valores: estadisticas.consultasPorTipo.map((fila) => fila.cantidad) }]}
            />
          </div>
        </div>
      )}
    </>
  )
}
