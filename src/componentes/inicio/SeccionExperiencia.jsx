// Experiencia laboral como línea de tiempo vertical
import { LuBriefcase, LuCalendar } from 'react-icons/lu'
import { experiencia } from '../../datos/perfil.js'
import { TituloSeccion } from '../comunes/TituloSeccion.jsx'

export function SeccionExperiencia() {
  return (
    <section id="experiencia" className="seccion">
      <TituloSeccion titulo="Experiencia" descripcion="Dónde trabajé y qué hice en cada lugar." />
      <ol className="lineaDeTiempo">
        {experiencia.map((trabajo) => (
          <li className="hito" key={trabajo.puesto + trabajo.lugar}>
            <span className={`puntoHito ${trabajo.actual ? 'actual' : ''}`} />
            <div className="vidrio tarjetaHito">
              <div className="cabeceraHito">
                <div>
                  <h3>{trabajo.puesto}</h3>
                  <span className="lugarHito">
                    <LuBriefcase /> {trabajo.lugar}
                  </span>
                </div>
                <span className="periodoHito">
                  <LuCalendar /> {trabajo.desde} - {trabajo.hasta}
                </span>
              </div>
              <p>{trabajo.detalle}</p>
              <div className="chipsHito">
                {trabajo.tecnologias.map((tecnologia) => (
                  <span className="chip" key={tecnologia}>
                    {tecnologia}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
