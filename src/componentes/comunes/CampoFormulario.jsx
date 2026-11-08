// Un campo de formulario con su etiqueta y su mensaje de error abajo.
// elemento: 'input' (por defecto), 'textarea' o 'select' (las opciones van como children)
export function CampoFormulario({ etiqueta, nombre, valor, onChange, error, tipo = 'text', elemento = 'input', children, ...resto }) {
  const clase = `${elemento === 'select' ? 'form-select' : 'form-control'} ${error ? 'is-invalid' : ''}`

  let control
  if (elemento === 'textarea') {
    control = <textarea id={nombre} name={nombre} value={valor} onChange={onChange} className={clase} rows={4} {...resto} />
  } else if (elemento === 'select') {
    control = (
      <select id={nombre} name={nombre} value={valor} onChange={onChange} className={clase} {...resto}>
        {children}
      </select>
    )
  } else {
    control = <input id={nombre} name={nombre} type={tipo} value={valor} onChange={onChange} className={clase} {...resto} />
  }

  return (
    <div className="mb-3">
      <label htmlFor={nombre} className="form-label">
        {etiqueta}
      </label>
      {control}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}
