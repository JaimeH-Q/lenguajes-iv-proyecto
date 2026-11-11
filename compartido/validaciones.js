// Validaciones de todo el proyecto.
// Las usa el frontend (para avisar antes de enviar) y el servidor (para validar siempre).
// Cada función devuelve un objeto con los errores: { campo: 'mensaje' }.
// Si el objeto está vacío, no hay errores.

export const tiposDeConsulta = ['general', 'cotizacion', 'asesoria']
export const roles = ['usuario', 'operador', 'admin']
export const estadosDeConsulta = ['pendiente', 'respondida', 'cerrada']

export const tiposDeImagen = ['image/jpeg', 'image/png', 'image/webp']
export const pesoMaximoImagen = 2 * 1024 * 1024 // 2 MB

function texto(valor) {
  return String(valor ?? '').trim()
}

function estaVacio(valor) {
  return texto(valor) === ''
}

function esEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(texto(valor))
}

function esLink(valor) {
  const limpio = texto(valor)
  // Se acepta un link completo (https://...) o una dirección de este mismo sitio (/demos/...)
  if (limpio.startsWith('/')) return true
  try {
    const link = new URL(limpio)
    return link.protocol === 'http:' || link.protocol === 'https:'
  } catch {
    return false
  }
}

function conMayuscula(frase) {
  return frase.charAt(0).toUpperCase() + frase.slice(1)
}

function validarLargo(errores, campo, valor, minimo, maximo, nombreCampo) {
  const largo = texto(valor).length
  if (largo === 0) {
    errores[campo] = `Falta ${nombreCampo}`
  } else if (largo < minimo) {
    errores[campo] = conMayuscula(`${nombreCampo} tiene que tener al menos ${minimo} letras`)
  } else if (largo > maximo) {
    errores[campo] = conMayuscula(`${nombreCampo} no puede pasar de ${maximo} letras`)
  }
}

export function hayErrores(errores) {
  return Object.keys(errores).length > 0
}

export function validarRegistro(datos) {
  const errores = {}
  validarLargo(errores, 'nombre', datos.nombre, 2, 60, 'el nombre')
  if (!esEmail(datos.email)) errores.email = 'El email no es válido'
  if (texto(datos.clave).length < 6) errores.clave = 'La clave tiene que tener al menos 6 caracteres'
  if (texto(datos.clave).length > 50) errores.clave = 'La clave es demasiado larga'
  if (datos.repetirClave !== undefined && datos.clave !== datos.repetirClave) {
    errores.repetirClave = 'Las claves no coinciden'
  }
  return errores
}

export function validarLogin(datos) {
  const errores = {}
  if (!esEmail(datos.email)) errores.email = 'El email no es válido'
  if (estaVacio(datos.clave)) errores.clave = 'Falta la clave'
  return errores
}

export function validarConsulta(datos) {
  const errores = {}
  validarLargo(errores, 'nombre', datos.nombre, 2, 60, 'el nombre')
  if (!esEmail(datos.email)) errores.email = 'El email no es válido'
  if (!tiposDeConsulta.includes(datos.tipo)) errores.tipo = 'Elegí un tipo de consulta'
  validarLargo(errores, 'mensaje', datos.mensaje, 10, 1000, 'el mensaje')
  return errores
}

export function validarRespuesta(datos) {
  const errores = {}
  validarLargo(errores, 'asunto', datos.asunto, 3, 120, 'el asunto')
  validarLargo(errores, 'texto', datos.texto, 5, 2000, 'la respuesta')
  return errores
}

export function validarProyecto(datos) {
  const errores = {}
  validarLargo(errores, 'titulo', datos.titulo, 3, 80, 'el título')
  validarLargo(errores, 'descripcion', datos.descripcion, 10, 2000, 'la descripción')
  validarLargo(errores, 'tecnologias', datos.tecnologias, 2, 200, 'las tecnologías')
  if (!estaVacio(datos.linkRepo) && !esLink(datos.linkRepo)) {
    errores.linkRepo = 'El link del repositorio no es válido'
  }
  return errores
}

export function validarDemo(datos) {
  const errores = {}
  if (!datos.proyectoId || Number.isNaN(Number(datos.proyectoId))) {
    errores.proyectoId = 'Elegí a qué proyecto pertenece'
  }
  validarLargo(errores, 'titulo', datos.titulo, 3, 80, 'el título')
  validarLargo(errores, 'descripcion', datos.descripcion, 10, 1000, 'la descripción')
  if (!esLink(datos.linkDemo)) errores.linkDemo = 'El link de la demo no es válido'
  return errores
}

export function validarServicio(datos) {
  const errores = {}
  validarLargo(errores, 'nombre', datos.nombre, 3, 80, 'el nombre')
  validarLargo(errores, 'descripcion', datos.descripcion, 10, 1000, 'la descripción')
  const precio = Number(datos.precioDesde)
  if (estaVacio(datos.precioDesde) || Number.isNaN(precio) || precio < 0) {
    errores.precioDesde = 'El precio tiene que ser un número mayor o igual a 0'
  }
  return errores
}

// Para el frontend: valida el archivo antes de subirlo.
// El servidor hace el mismo control en el middleware subirImagen.
export function validarImagen(archivo, esObligatoria) {
  const errores = {}
  if (!archivo) {
    if (esObligatoria) errores.imagen = 'Falta la imagen'
    return errores
  }
  if (!tiposDeImagen.includes(archivo.type)) {
    errores.imagen = 'La imagen tiene que ser JPG, PNG o WEBP'
  } else if (archivo.size > pesoMaximoImagen) {
    errores.imagen = 'La imagen no puede pesar más de 2 MB'
  }
  return errores
}
