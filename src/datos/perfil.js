// Datos fijos del desarrollador dueño del portfolio.
// Reemplazar por los datos reales.
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiSqlite,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiVite,
  SiPostman,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { LuMonitor, LuServer, LuDatabase, LuWrench } from 'react-icons/lu'

export const perfil = {
  nombre: 'Juan',
  apellido: 'Desarrollador',
  puesto: 'Desarrollador Fullstack',
  ciudad: 'Argentina',
  disponible: true,
  presentacion:
    'Hago aplicaciones web de punta a punta: la interfaz que usa la gente, el servidor que la sostiene y la base de datos que guarda todo. Me gusta el código simple, prolijo y que funcione.',
  email: 'contacto@miportfolio.com',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
  tiempoDeRespuesta: 'Respondo en menos de 24 horas',
}

// Cada tecnología tiene su logo y el color de la marca
export const tecnologias = [
  {
    grupo: 'Frontend',
    descripcion: 'Interfaces rápidas y adaptables a cualquier pantalla',
    icono: LuMonitor,
    lista: [
      { nombre: 'HTML', icono: SiHtml5, color: '#E34F26' },
      { nombre: 'CSS', icono: SiCss, color: '#663399' },
      { nombre: 'JavaScript', icono: SiJavascript, color: '#F7DF1E' },
      { nombre: 'React', icono: SiReact, color: '#61DAFB' },
      { nombre: 'Bootstrap', icono: SiBootstrap, color: '#7952B3' },
    ],
  },
  {
    grupo: 'Backend',
    descripcion: 'APIs y servidores que conectan todo',
    icono: LuServer,
    lista: [
      { nombre: 'Node.js', icono: SiNodedotjs, color: '#5FA04E' },
      { nombre: 'Express', icono: SiExpress, color: '#E7ECF7' },
    ],
  },
  {
    grupo: 'Bases de datos',
    descripcion: 'Datos ordenados y consultas eficientes',
    icono: LuDatabase,
    lista: [
      { nombre: 'SQLite', icono: SiSqlite, color: '#44A8E0' },
      { nombre: 'MySQL', icono: SiMysql, color: '#6FA8DC' },
      { nombre: 'PostgreSQL', icono: SiPostgresql, color: '#6B8CFF' },
    ],
  },
  {
    grupo: 'Herramientas',
    descripcion: 'Lo que uso todos los días para trabajar',
    icono: LuWrench,
    lista: [
      { nombre: 'Git', icono: SiGit, color: '#F05032' },
      { nombre: 'GitHub', icono: SiGithub, color: '#E7ECF7' },
      { nombre: 'VS Code', icono: VscVscode, color: '#22A6F2' },
      { nombre: 'Vite', icono: SiVite, color: '#9B7BFF' },
      { nombre: 'Postman', icono: SiPostman, color: '#FF6C37' },
    ],
  },
]

export const experiencia = [
  {
    puesto: 'Desarrollador Fullstack',
    lugar: 'Freelance',
    desde: '2024',
    hasta: 'Hoy',
    actual: true,
    detalle:
      'Sitios y sistemas a medida para comercios y profesionales: desde el relevamiento con el cliente hasta la puesta en producción.',
    tecnologias: ['React', 'Node.js', 'Express', 'MySQL'],
  },
  {
    puesto: 'Desarrollador Frontend',
    lugar: 'Agencia Ejemplo',
    desde: '2022',
    hasta: '2024',
    detalle:
      'Maquetado de sitios y aplicaciones en React para distintos clientes, trabajando con diseñadores sobre prototipos en Figma.',
    tecnologias: ['React', 'JavaScript', 'Bootstrap'],
  },
  {
    puesto: 'Pasante de sistemas',
    lugar: 'Empresa Ejemplo S.A.',
    desde: '2021',
    hasta: '2022',
    detalle: 'Soporte técnico y pequeños desarrollos internos para automatizar tareas administrativas.',
    tecnologias: ['HTML', 'CSS', 'SQL'],
  },
]
