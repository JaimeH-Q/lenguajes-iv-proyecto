import { Link } from 'react-router'

export function NoEncontrada() {
  return (
    <section className="py-5 text-center">
      <h1>Esta página no existe</h1>
      <Link to="/">Volver al inicio</Link>
    </section>
  )
}
