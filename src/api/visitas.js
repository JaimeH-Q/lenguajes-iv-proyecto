import { peticion } from './cliente.js'

const claveVisita = 'visitaContada'

// Registra una visita por pestaña abierta (al recargar no se vuelve a contar)
export function registrarVisita() {
  try {
    if (sessionStorage.getItem(claveVisita)) return
    sessionStorage.setItem(claveVisita, 'si')
  } catch {
    // si no se puede guardar, se cuenta igual
  }
  peticion('/visitas', { metodo: 'POST' }).catch(() => {})
}
