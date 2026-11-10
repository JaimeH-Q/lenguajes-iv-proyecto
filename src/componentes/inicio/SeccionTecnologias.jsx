// Tecnologías agrupadas, cada una con su logo
import { tecnologias } from '../../datos/perfil.js'
import { TituloSeccion } from '../comunes/TituloSeccion.jsx'

export function SeccionTecnologias() {
  return (
    <section id="tecnologias" className="seccion">
      <TituloSeccion
        titulo="Tecnologías que uso"
        descripcion="El stack con el que trabajo todos los días, del navegador a la base de datos."
      />
      <div className="row g-4">
        {tecnologias.map((grupo) => {
          const IconoGrupo = grupo.icono
          // Los grupos con muchas tecnologías ocupan todo el ancho; los chicos, la mitad
          const columnas = grupo.lista.length > 3 ? 'col-12' : 'col-12 col-lg-6'
          return (
            <div className={columnas} key={grupo.grupo}>
              <div className="vidrio tarjetaGrupo">
                <div className="cabeceraGrupo">
                  <span className="iconoGrupo">
                    <IconoGrupo />
                  </span>
                  <div>
                    <h3>{grupo.grupo}</h3>
                    <p>{grupo.descripcion}</p>
                  </div>
                  <span className="cantidadTecnologias">{grupo.lista.length} tecnologías</span>
                </div>

                <div className="grillaTecnologias">
                  {grupo.lista.map((tecnologia) => {
                    const Logo = tecnologia.icono
                    return (
                      <div className="tecnologia" key={tecnologia.nombre} style={{ '--colorMarca': tecnologia.color }}>
                        <span className="logoTecnologia">
                          <Logo />
                        </span>
                        {tecnologia.nombre}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
