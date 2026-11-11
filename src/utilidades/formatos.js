// Funciones para dar formato a fechas, precios y textos

// '2026-10-21 14:30:00' → '21/10/2026 14:30'
export function formatearFecha(fechaDeLaBase) {
  if (!fechaDeLaBase) return '-'
  const [dia, hora = ''] = fechaDeLaBase.split(' ')
  const [anio, mes, numeroDia] = dia.split('-')
  return `${numeroDia}/${mes}/${anio} ${hora.slice(0, 5)}`.trim()
}

// 300000 → '$300.000'
export function formatearPrecio(numero) {
  return `$${Number(numero).toLocaleString('es-AR')}`
}

export const nombresDeTipos = {
  general: 'Consulta general',
  cotizacion: 'Cotización',
  asesoria: 'Asesoría técnica',
}

export const nombresDeEstados = {
  pendiente: 'Pendiente',
  respondida: 'Respondida',
  cerrada: 'Cerrada',
}

export const nombresDeRoles = {
  usuario: 'Usuario',
  operador: 'Operador',
  admin: 'Administrador',
}

// URL de la imagen de un proyecto (o null si no tiene)
export function urlImagen(nombreImagen) {
  return nombreImagen ? `/uploads/${nombreImagen}` : null
}

// Fecha de hoy en formato AAAA-MM-DD (para los filtros de fecha)
export function fechaHoy(restarDias = 0) {
  const fecha = new Date()
  fecha.setDate(fecha.getDate() - restarDias)
  const dosCifras = (numero) => String(numero).padStart(2, '0')
  return `${fecha.getFullYear()}-${dosCifras(fecha.getMonth() + 1)}-${dosCifras(fecha.getDate())}`
}
