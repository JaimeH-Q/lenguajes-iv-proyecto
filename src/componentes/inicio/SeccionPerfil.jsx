// Primera sección (hero): presentación, botones y redes
import { Link } from 'react-router'
import { LuMail, LuChevronDown } from 'react-icons/lu'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { perfil } from '../../datos/perfil.js'
import { PortalHero } from './PortalHero.jsx'

export function SeccionPerfil() {
  return (
    <section id="perfil" className="hero">
      <div className="row align-items-center w-100 g-0">
        <div className="col-12 col-lg-7">
          {perfil.disponible && (
            <span className="etiquetaDisponible">
              <span className="puntoVerde" />
              Disponible para proyectos freelance
            </span>
          )}

          <h1 className="tituloHero">
            Soy <span className="textoDegradado">{perfil.nombre}</span>
            <br />
            {perfil.puesto}
          </h1>

          <p className="bajadaHero">{perfil.presentacion}</p>

          <div className="d-flex flex-wrap gap-3">
            <Link to="/proyectos" className="btn btn-primary btn-lg">
              Ver proyectos
            </Link>
            <a href="#contacto" className="btn btn-texto btn-lg">
              Escribime
            </a>
          </div>

          <div className="redesHero">
            <a href={perfil.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={perfil.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={`mailto:${perfil.email}`} aria-label="Email">
              <LuMail />
            </a>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <PortalHero />
        </div>
      </div>

      <a href="#tecnologias" className="seguiBajando">
        Seguí bajando
        <LuChevronDown />
      </a>
    </section>
  )
}
