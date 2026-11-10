// Círculo del hero: una ventana de código con los datos del perfil y tres íconos flotando alrededor
import { LuCode, LuMail, LuDatabase } from 'react-icons/lu'
import { perfil } from '../../datos/perfil.js'

export function PortalHero() {
  return (
    <div className="portal" aria-hidden="true">
      <div className="portalAnillo">
        <div className="portalInterior">
          <div className="ventanaCodigo">
            <div className="ventanaCodigoBarra">
              <span />
              <span />
              <span />
              <span className="nombreArchivo">perfil.js</span>
            </div>
            <pre>
              <span className="codigoPalabra">const</span> dev = {'{'}
              {'\n  '}
              <span className="codigoClave">nombre</span>: <span className="codigoTexto">'{perfil.nombre}'</span>,
              {'\n  '}
              <span className="codigoClave">rol</span>: <span className="codigoTexto">'Fullstack'</span>,
              {'\n  '}
              <span className="codigoClave">stack</span>: [<span className="codigoTexto">'React'</span>,{' '}
              <span className="codigoTexto">'Node'</span>, <span className="codigoTexto">'SQL'</span>],
              {'\n  '}
              <span className="codigoClave">disponible</span>: <span className="codigoValor">{String(perfil.disponible)}</span>,
              {'\n'}
              {'}'}
            </pre>
          </div>
        </div>
      </div>
      <span className="chipFlotante chipArriba">
        <LuCode />
      </span>
      <span className="chipFlotante chipIzquierda">
        <LuMail />
      </span>
      <span className="chipFlotante chipAbajo">
        <LuDatabase />
      </span>
    </div>
  )
}
