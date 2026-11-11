import { useEffect, useState } from 'react'
import { obtenerUsuarios, actualizarRol, eliminarUsuario } from '../../api/usuarios.js'
import { useSesion } from '../../contexto/useSesion.js'
import { TablaUsuarios } from '../../componentes/admin/TablaUsuarios.jsx'
import { Cargando } from '../../componentes/comunes/Cargando.jsx'
import { AlertaError } from '../../componentes/comunes/AlertaError.jsx'

export function GestionUsuarios() {
  const { usuario: yo } = useSesion()
  const [usuarios, setUsuarios] = useState(null)
  const [recargas, setRecargas] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerUsuarios()
      .then(setUsuarios)
      .catch((err) => setError(err.message))
  }, [recargas])

  async function manejarCambioRol(usuario, rol) {
    setError('')
    try {
      await actualizarRol(usuario.id, rol)
      setRecargas(recargas + 1)
    } catch (err) {
      setError(err.message)
    }
  }

  async function manejarEliminar(usuario) {
    if (!confirm(`¿Seguro que querés borrar a ${usuario.nombre}?`)) return
    setError('')
    try {
      await eliminarUsuario(usuario.id)
      setRecargas(recargas + 1)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <h1 className="h3 mb-3">Usuarios</h1>
      <AlertaError mensaje={error} />
      {!usuarios ? (
        <Cargando />
      ) : (
        <>
          <p className="text-secondary small">{usuarios.length} cuentas en total.</p>
          <TablaUsuarios usuarios={usuarios} miId={yo.id} onCambiarRol={manejarCambioRol} onEliminar={manejarEliminar} />
        </>
      )}
    </>
  )
}
