// Título y bajada de cada sección de la página de inicio
export function TituloSeccion({ titulo, descripcion, centrado = false }) {
  return (
    <div className={`tituloSeccion ${centrado ? 'centrado' : ''}`}>
      <h2>{titulo}</h2>
      {descripcion && <p>{descripcion}</p>}
    </div>
  )
}
