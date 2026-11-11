import { perfil } from '../../datos/perfil.js'

export function Footer() {
  return (
    <footer className="footerPrincipal py-4 mt-5">
      <div className="container d-flex flex-wrap justify-content-between gap-2">
        <span>
          {perfil.nombre} {perfil.apellido}, {perfil.puesto}
        </span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
