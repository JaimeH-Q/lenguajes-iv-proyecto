// Lista de consultas con filtros por tipo y estado
import { useEffect, useState } from 'react'
import { obtenerConsultas } from '../../api/consultas.js'
import { TablaConsultas } from '../../componentes/admin/TablaConsultas.jsx'
import { Cargando } from '../../componentes/comunes/Cargando.jsx'
import { AlertaError } from '../../componentes/comunes/AlertaError.jsx'
import { tiposDeConsulta, estadosDeConsulta } from '../../../compartido/validaciones.js'
import { nombresDeTipos, nombresDeEstados } from '../../utilidades/formatos.js'

export function Consultas() {
  const [filtros, setFiltros] = useState({ tipo: '', estado: '' })
  const [consultas, setConsultas] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerConsultas(filtros)
      .then(setConsultas)
      .catch((err) => setError(err.message))
  }, [filtros])

  function manejarCambioFiltro(evento) {
    setFiltros({ ...filtros, [evento.target.name]: evento.target.value })
  }

  return (
    <>
      <h1 className="h3 mb-3">Consultas</h1>

      <div className="row g-2 mb-3">
        <div className="col-6 col-md-4">
          <select name="tipo" className="form-select" value={filtros.tipo} onChange={manejarCambioFiltro}>
            <option value="">Todos los tipos</option>
            {tiposDeConsulta.map((tipo) => (
              <option key={tipo} value={tipo}>
                {nombresDeTipos[tipo]}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-4">
          <select name="estado" className="form-select" value={filtros.estado} onChange={manejarCambioFiltro}>
            <option value="">Todos los estados</option>
            {estadosDeConsulta.map((estado) => (
              <option key={estado} value={estado}>
                {nombresDeEstados[estado]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AlertaError mensaje={error} />
      {consultas ? <TablaConsultas consultas={consultas} /> : <Cargando />}
    </>
  )
}
