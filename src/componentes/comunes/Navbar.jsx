import { Link, NavLink, useNavigate } from 'react-router'
import { LuLogOut } from 'react-icons/lu'
import { useSesion } from '../../contexto/useSesion.js'
import { perfil } from '../../datos/perfil.js'

export function Navbar() {
  const { usuario, estaLogueado, esOperador, logout } = useSesion()
  const navigate = useNavigate()

  async function manejarLogout() {
    await logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-md navbarPrincipal">
      <div className="container">
        <Link className="navbar-brand logo" to="/">
          <span className="letraLogo">{perfil.nombre.charAt(0)}</span>
          {perfil.nombre.slice(1)}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto me-md-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/proyectos">
                Proyectos
              </NavLink>
            </li>
            {estaLogueado && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/demos">
                  Demos
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="/#contacto">
                Contacto
              </a>
            </li>
            {esOperador && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Panel
                </NavLink>
              </li>
            )}
          </ul>

          {estaLogueado ? (
            <div className="d-flex align-items-center gap-3 py-2 py-md-0">
              <span className="saludoUsuario">Hola, {usuario.nombre}</span>
              <button className="btn btn-vidrio btn-sm d-inline-flex align-items-center gap-2" onClick={manejarLogout}>
                <LuLogOut /> Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="d-flex gap-2 py-2 py-md-0">
              <Link className="btn btn-texto btn-sm" to="/login">
                Ingresar
              </Link>
              <Link className="btn btn-vidrio btn-sm" to="/registro">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
