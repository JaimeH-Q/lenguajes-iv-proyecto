// Rutas de la aplicación
import { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { Navbar } from './componentes/comunes/Navbar.jsx'
import { Footer } from './componentes/comunes/Footer.jsx'
import { FondoDecorativo } from './componentes/comunes/FondoDecorativo.jsx'
import { RutaPrivada } from './rutas/RutaPrivada.jsx'
import { RutaOperador } from './rutas/RutaOperador.jsx'
import { RutaAdmin } from './rutas/RutaAdmin.jsx'
import { registrarVisita } from './api/visitas.js'

import { Inicio } from './paginas/publicas/Inicio.jsx'
import { Proyectos } from './paginas/publicas/Proyectos.jsx'
import { Login } from './paginas/publicas/Login.jsx'
import { Registro } from './paginas/publicas/Registro.jsx'
import { NoEncontrada } from './paginas/publicas/NoEncontrada.jsx'

import { DetalleProyecto } from './paginas/usuario/DetalleProyecto.jsx'
import { Demos } from './paginas/usuario/Demos.jsx'

import { LayoutAdmin } from './paginas/admin/LayoutAdmin.jsx'
import { InicioAdmin } from './paginas/admin/InicioAdmin.jsx'
import { Dashboard } from './paginas/admin/Dashboard.jsx'
import { Consultas } from './paginas/admin/Consultas.jsx'
import { DetalleConsulta } from './paginas/admin/DetalleConsulta.jsx'
import { CorreosEnviados } from './paginas/admin/CorreosEnviados.jsx'
import { GestionProyectos } from './paginas/admin/GestionProyectos.jsx'
import { GestionDemos } from './paginas/admin/GestionDemos.jsx'
import { GestionServicios } from './paginas/admin/GestionServicios.jsx'
import { GestionUsuarios } from './paginas/admin/GestionUsuarios.jsx'

export default function App() {
  // Cada vez que alguien abre el sitio, se cuenta una visita
  useEffect(() => {
    registrarVisita()
  }, [])

  return (
    <>
      <FondoDecorativo />
      <Navbar />
      <main className="container">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Solo usuarios registrados */}
          <Route element={<RutaPrivada />}>
            <Route path="/proyectos/:id" element={<DetalleProyecto />} />
            <Route path="/demos" element={<Demos />} />
          </Route>

          {/* Panel de administración: operador y admin */}
          <Route element={<RutaOperador />}>
            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<InicioAdmin />} />
              <Route path="consultas" element={<Consultas />} />
              <Route path="consultas/:id" element={<DetalleConsulta />} />

              {/* Solo admin */}
              <Route element={<RutaAdmin />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="correos" element={<CorreosEnviados />} />
                <Route path="proyectos" element={<GestionProyectos />} />
                <Route path="demos" element={<GestionDemos />} />
                <Route path="servicios" element={<GestionServicios />} />
                <Route path="usuarios" element={<GestionUsuarios />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
