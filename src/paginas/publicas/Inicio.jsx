import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { SeccionPerfil } from '../../componentes/inicio/SeccionPerfil.jsx'
import { SeccionTecnologias } from '../../componentes/inicio/SeccionTecnologias.jsx'
import { SeccionServicios } from '../../componentes/inicio/SeccionServicios.jsx'
import { SeccionExperiencia } from '../../componentes/inicio/SeccionExperiencia.jsx'
import { FormularioContacto } from '../../componentes/inicio/FormularioContacto.jsx'
import { obtenerServicios } from '../../api/servicios.js'
import { enviarConsulta } from '../../api/consultas.js'

export function Inicio() {
  const [servicios, setServicios] = useState([])
  const location = useLocation()

  useEffect(() => {
    obtenerServicios()
      .then(setServicios)
      .catch(() => setServicios([]))
  }, [])

  // Si se llega con un link tipo /#contacto, hace scroll hasta esa sección
  useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView()
    }
  }, [location.hash])

  return (
    <>
      <SeccionPerfil />
      <SeccionTecnologias />
      <SeccionServicios servicios={servicios} />
      <SeccionExperiencia />
      <FormularioContacto onEnviar={enviarConsulta} />
    </>
  )
}
