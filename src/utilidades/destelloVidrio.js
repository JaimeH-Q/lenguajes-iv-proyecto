// Hace que el destello de las tarjetas de vidrio siga al mouse.
// Escucha el movimiento del mouse en toda la página y, si está arriba de una
// tarjeta (.vidrio o .card), le pasa la posición en las variables CSS --mouseX y --mouseY.
// El dibujo del destello está en estilos/vidrio.css
export function activarDestelloVidrio() {
  document.addEventListener('pointermove', (evento) => {
    const tarjeta = evento.target.closest?.('.vidrio, .card')
    if (!tarjeta) return

    const posicion = tarjeta.getBoundingClientRect()
    tarjeta.style.setProperty('--mouseX', `${evento.clientX - posicion.left}px`)
    tarjeta.style.setProperty('--mouseY', `${evento.clientY - posicion.top}px`)
  })
}
