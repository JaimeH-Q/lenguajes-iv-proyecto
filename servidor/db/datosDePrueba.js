// Carga datos de prueba la primera vez (cuando no hay ningún usuario).
// Así el sitio no arranca vacío y los gráficos tienen algo para mostrar.
import bcrypt from 'bcryptjs'
import db from './conexion.js'
import * as usuarios from '../modelos/usuarios.js'
import * as proyectos from '../modelos/proyectos.js'
import * as demos from '../modelos/demos.js'
import * as servicios from '../modelos/servicios.js'
import * as consultas from '../modelos/consultas.js'
import * as correos from '../modelos/correos.js'
import * as visitas from '../modelos/visitas.js'
import { emailDelSitio } from '../config.js'

// Devuelve una fecha de hace unos días en el formato que usa la base: 'AAAA-MM-DD HH:MM:SS'
function haceDias(dias, hora = 12) {
  const fecha = new Date()
  fecha.setDate(fecha.getDate() - dias)
  fecha.setHours(hora, Math.floor(Math.random() * 60), 0, 0)
  const dosCifras = (numero) => String(numero).padStart(2, '0')
  return (
    `${fecha.getFullYear()}-${dosCifras(fecha.getMonth() + 1)}-${dosCifras(fecha.getDate())} ` +
    `${dosCifras(fecha.getHours())}:${dosCifras(fecha.getMinutes())}:00`
  )
}

export function cargarDatosDePrueba() {
  const cantidad = db.prepare('select count(*) as cantidad from usuarios').get().cantidad
  if (cantidad > 0) return

  console.log('Base vacía: cargando datos de ejemplo...')

  // Todo junto en una transacción: o se carga todo, o nada
  db.exec('begin')
  try {
    // Usuarios para probar (las claves están en el README)
    usuarios.crear({
      nombre: 'Admin',
      email: 'admin@portfolio.com',
      clave: bcrypt.hashSync('admin123', 10),
      rol: 'admin',
      fechaAlta: haceDias(30),
    })
    usuarios.crear({
      nombre: 'Operador',
      email: 'operador@portfolio.com',
      clave: bcrypt.hashSync('operador123', 10),
      rol: 'operador',
      fechaAlta: haceDias(30),
    })

    const nombres = ['Lucía Gómez', 'Martín Pérez', 'Sofía Díaz', 'Juan Romero', 'Valentina Ruiz', 'Tomás Herrera']
    const registrados = nombres.map((nombre, numero) =>
      usuarios.crear({
        nombre,
        email: numero === 0 ? 'usuario@portfolio.com' : `usuario${numero}@ejemplo.com`,
        clave: bcrypt.hashSync('usuario123', 10),
        rol: 'usuario',
        fechaAlta: haceDias(12 - numero * 2),
      }),
    )

    // Servicios
    servicios.crear({
      nombre: 'Desarrollo web a medida',
      descripcion: 'Sitios y aplicaciones web completas, del diseño a la puesta en marcha.',
      precioDesde: 300000,
    })
    servicios.crear({
      nombre: 'APIs y backend',
      descripcion: 'Servidores en Node.js con bases de datos SQL, listos para conectar con cualquier frontend.',
      precioDesde: 200000,
    })
    servicios.crear({
      nombre: 'Asesoría técnica',
      descripcion: 'Te ayudo a elegir tecnologías, ordenar tu proyecto o destrabar un problema puntual.',
      precioDesde: 25000,
    })
    servicios.crear({
      nombre: 'Mantenimiento',
      descripcion: 'Arreglos, mejoras y actualizaciones de sitios que ya están andando.',
      precioDesde: 80000,
    })

    // Proyectos y demos
    const tienda = proyectos.crear({
      titulo: 'Tienda online',
      descripcion:
        'Tienda con carrito de compras, panel para cargar productos y control de stock. Hecha con React en el frontend y Node.js con MySQL en el backend.',
      tecnologias: 'React, Node.js, Express, MySQL',
      linkRepo: 'https://github.com/',
    })
    const turnos = proyectos.crear({
      titulo: 'Sistema de turnos',
      descripcion:
        'Aplicación para que un consultorio maneje sus turnos: los pacientes reservan desde la web y el consultorio los confirma desde un panel.',
      tecnologias: 'React, Bootstrap, Node.js, SQLite',
      linkRepo: 'https://github.com/',
    })
    const herramientas = proyectos.crear({
      titulo: 'Herramientas chiquitas',
      descripcion:
        'Un conjunto de herramientas simples hechas con JavaScript puro, para mostrar manejo del DOM y eventos.',
      tecnologias: 'HTML, CSS, JavaScript',
      linkRepo: 'https://github.com/',
    })

    demos.crear({
      proyectoId: herramientas.id,
      titulo: 'Contador de clics',
      descripcion: 'Un contador que suma, resta y vuelve a cero.',
      linkDemo: '/demos/contador.html',
    })
    demos.crear({
      proyectoId: herramientas.id,
      titulo: 'Conversor de temperatura',
      descripcion: 'Pasa grados Celsius a Fahrenheit y al revés mientras escribís.',
      linkDemo: '/demos/conversor.html',
    })
    demos.crear({
      proyectoId: tienda.id,
      titulo: 'Carrito de compras',
      descripcion: 'Versión de prueba del carrito (link de ejemplo).',
      linkDemo: 'https://example.com/',
    })
    demos.crear({
      proyectoId: turnos.id,
      titulo: 'Reserva de turnos',
      descripcion: 'Versión de prueba de la reserva (link de ejemplo).',
      linkDemo: 'https://example.com/',
    })

    // Consultas (con sus correos, como si hubieran pasado de verdad)
    const ejemplosDeConsultas = [
      { nombre: 'Carla Méndez', email: 'carla@ejemplo.com', tipo: 'cotizacion', dias: 9, mensaje: 'Hola! Necesito una página para mi emprendimiento de ropa. ¿Cuánto saldría?' },
      { nombre: 'Diego Sosa', email: 'diego@ejemplo.com', tipo: 'asesoria', dias: 7, mensaje: 'Estoy armando una API y no sé si usar MySQL o MongoDB. ¿Me podés orientar?' },
      { nombre: 'Ana Torres', email: 'ana@ejemplo.com', tipo: 'general', dias: 5, mensaje: '¿Trabajás con clientes de otras provincias? Soy de Córdoba.' },
      { nombre: 'Pablo Castro', email: 'pablo@ejemplo.com', tipo: 'cotizacion', dias: 3, mensaje: 'Quiero un sistema de turnos para mi peluquería, parecido al que tenés en los proyectos.' },
      { nombre: 'Laura Benítez', email: 'laura@ejemplo.com', tipo: 'cotizacion', dias: 1, mensaje: 'Hola, ¿hacés tiendas online con Mercado Pago? Pasame presupuesto por favor.' },
    ]
    const nombresDeTipos = {
      general: 'Consulta general',
      cotizacion: 'Cotización de proyecto',
      asesoria: 'Asesoría técnica',
    }
    for (const ejemplo of ejemplosDeConsultas) {
      const fecha = haceDias(ejemplo.dias, 10)
      const consulta = consultas.crear({ ...ejemplo, fecha })
      correos.crear({
        para: emailDelSitio,
        asunto: `Nueva consulta: ${nombresDeTipos[consulta.tipo]}`,
        texto: `${consulta.nombre} (${consulta.email}) escribió:\n\n${consulta.mensaje}`,
        consultaId: consulta.id,
        fecha,
      })
    }
    // La primera ya está respondida
    consultas.actualizarEstado(1, 'respondida')
    correos.crear({
      para: 'carla@ejemplo.com',
      asunto: 'Presupuesto para tu página',
      texto: 'Hola Carla! Una página así arranca en $300.000. Si querés lo charlamos por videollamada.',
      consultaId: 1,
      fecha: haceDias(8, 15),
    })

    // Visitas de las últimas dos semanas
    for (let dias = 13; dias >= 0; dias--) {
      const cuantas = 5 + Math.floor(Math.random() * 15)
      for (let numero = 0; numero < cuantas; numero++) {
        const deUnRegistrado = Math.random() < 0.3
        const quien = deUnRegistrado ? registrados[Math.floor(Math.random() * registrados.length)].id : null
        visitas.registrar(quien, haceDias(dias, 8 + Math.floor(Math.random() * 14)))
      }
    }
    db.exec('commit')
  } catch (error) {
    db.exec('rollback')
    throw error
  }

  console.log('Datos de ejemplo cargados.')
}
