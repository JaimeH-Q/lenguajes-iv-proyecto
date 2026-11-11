// Servicio de correo simulado.
// No envía emails reales: guarda cada correo en la tabla "correos" y lo muestra
// en la consola del servidor. Desde el panel de admin se ven en "Correos enviados".
import * as correos from '../modelos/correos.js'

export function enviarCorreo({ para, asunto, texto, consultaId }) {
  const correo = correos.crear({ para, asunto, texto, consultaId })

  console.log('\n[Correo simulado]')
  console.log(`   Para:   ${para}`)
  console.log(`   Asunto: ${asunto}`)
  console.log(`   ${texto.split('\n').join('\n   ')}\n`)

  return correo
}
