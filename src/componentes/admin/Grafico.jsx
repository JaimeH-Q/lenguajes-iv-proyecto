// Un gráfico simple hecho con Chart.js.
// tipo: 'barras', 'linea' o 'torta'
// etiquetas: lo que va abajo (días, tipos, etc.)
// series: [{ nombre: 'Visitas', valores: [1, 2, 3] }, ...]
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend)

// Colores para fondo oscuro
Chart.defaults.color = '#94a3c2'
Chart.defaults.borderColor = 'rgba(148, 170, 220, 0.12)'
Chart.defaults.font.family = "'Manrope Variable', system-ui, sans-serif"

const colores = ['#4c8dff', '#9b7bff', '#34d399', '#fbbf77', '#f472b6']

export function Grafico({ tipo, titulo, etiquetas, series }) {
  const datos = {
    labels: etiquetas,
    datasets: series.map((serie, numero) => ({
      label: serie.nombre,
      data: serie.valores,
      backgroundColor: tipo === 'torta' ? colores : colores[numero % colores.length],
      borderColor: tipo === 'torta' ? '#0b1226' : colores[numero % colores.length],
      borderRadius: tipo === 'barras' ? 6 : 0,
      tension: 0.35,
    })),
  }
  const opciones = { responsive: true, maintainAspectRatio: false }
  if (tipo !== 'torta') {
    // El eje Y muestra solo números enteros
    opciones.scales = { y: { beginAtZero: true, ticks: { precision: 0 } } }
  }

  return (
    <div className="card h-100">
      <div className="card-body">
        <h3 className="h6">{titulo}</h3>
        {etiquetas.length === 0 ? (
          <p className="text-secondary small">No hay datos en estas fechas.</p>
        ) : (
          <div className="contenedorGrafico">
            {tipo === 'barras' && <Bar data={datos} options={opciones} />}
            {tipo === 'linea' && <Line data={datos} options={opciones} />}
            {tipo === 'torta' && <Pie data={datos} options={opciones} />}
          </div>
        )}
      </div>
    </div>
  )
}
