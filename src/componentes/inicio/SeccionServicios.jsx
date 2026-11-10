// Servicios que ofrece el desarrollador (vienen de la base de datos)
import { LuPanelsTopLeft, LuServer, LuLightbulb, LuWrench, LuArrowUpRight } from 'react-icons/lu'
import { formatearPrecio } from '../../utilidades/formatos.js'
import { TituloSeccion } from '../comunes/TituloSeccion.jsx'

// Los servicios no tienen ícono en la base, así que se reparten estos en orden
const iconos = [LuPanelsTopLeft, LuServer, LuLightbulb, LuWrench]

export function SeccionServicios({ servicios }) {
  return (
    <section id="servicios" className="seccion">
      <TituloSeccion
        titulo="Lo que ofrezco"
        descripcion="Desde una página nueva hasta destrabar un problema puntual. Los precios son de referencia: cada proyecto se cotiza a medida."
      />
      {servicios.length === 0 && <p className="text-secondary">Todavía no hay servicios cargados.</p>}
      <div className="row g-4">
        {servicios.map((servicio, posicion) => {
          const Icono = iconos[posicion % iconos.length]
          return (
            <div className="col-12 col-md-6" key={servicio.id}>
              <article className="vidrio tarjetaServicio">
                <span className="lineaSuperior" />
                <span className="marcaDeAgua" aria-hidden="true">
                  <Icono />
                </span>

                <div className="cabeceraServicio">
                  <span className="iconoGrupo">
                    <Icono />
                  </span>
                  <div className="precioServicio">
                    desde
                    <strong>{formatearPrecio(servicio.precioDesde)}</strong>
                  </div>
                </div>

                <h3>{servicio.nombre}</h3>
                <p>{servicio.descripcion}</p>

                <div className="pieServicio">
                  <a href="#contacto" className="linkServicio">
                    Pedir presupuesto <LuArrowUpRight />
                  </a>
                </div>
              </article>
            </div>
          )
        })}
      </div>
    </section>
  )
}
