// El token que devuelve el servidor al hacer login. Se guarda en el navegador (localStorage).
const claveToken = 'tokenPortfolio'

export function obtenerToken() {
  try {
    return localStorage.getItem(claveToken)
  } catch {
    return null
  }
}

export function guardarToken(token) {
  try {
    localStorage.setItem(claveToken, token)
  } catch {
    // Si el navegador no permite guardar, la sesión se pierde al recargar
  }
}

export function borrarToken() {
  try {
    localStorage.removeItem(claveToken)
  } catch {
    // no hay nada que hacer
  }
}
