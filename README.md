# Portfolio Fullstack · Trabajo Final Lenguajes IV

Portfolio de un desarrollador fullstack con:

- **Parte pública:** presentación, tecnologías, servicios, experiencia y formulario de contacto.
- **Proyectos y demos:** la lista la ve cualquiera, pero el detalle y las demos solo los usuarios registrados.
- **Panel del operador:** ver las consultas, filtrarlas, responderlas por "email" y hacerles seguimiento.
- **Panel del admin:** todo lo del operador, más:
  - ABM (alta, baja y modificación) de proyectos, demos y servicios
  - gestión de usuarios
  - contadores de visitas
  - gráficos con filtro por fechas
  - la bandeja de correos enviados

Todo corre en la compu (localhost). No hace falta ninguna cuenta externa.

## Qué se usa

| Parte | Tecnología |
|---|---|
| Página | React + Vite + React Router |
| Estilos (framework CSS) | Bootstrap 5 |
| Gráficos | Chart.js |
| Servidor | Node.js + Express |
| Base de datos | SQLite (el que ya viene con Node, `node:sqlite`). Es SQL y queda en un archivo dentro del proyecto |
| Claves | bcryptjs (se guardan encriptadas) |
| Imágenes | multer (solo JPG, PNG o WEBP, hasta 2 MB) |
| Emails | **Simulados**: se guardan en la base y se ven en el panel de admin ("Correos enviados") |

## Cómo correrlo

Hace falta **Node.js 22.22 o más nuevo**.

```bash
npm install
npm run dev
```

Eso levanta las dos partes juntas:

- La página: http://localhost:5173 (esta es la que hay que abrir)
- El servidor: http://localhost:3001

La primera vez se crea la base de datos sola, con datos de ejemplo.

### Otros comandos

| Comando | Qué hace |
|---|---|
| `npm run servidor` | Levanta solo el servidor |
| `npm run cliente` | Levanta solo el frontend |
| `npm start` | Arma la versión final y la sirve todo junto en http://localhost:3001 |
| `npm run reiniciarBase` | Borra la base y las imágenes subidas. Al volver a arrancar se cargan los ejemplos de nuevo |
| `npm run lint` | Revisa el código con ESLint |

## Usuarios para probar

| Rol | Email | Clave |
|---|---|---|
| Administrador | admin@portfolio.com | admin123 |
| Operador | operador@portfolio.com | operador123 |
| Usuario registrado | usuario@portfolio.com | usuario123 |

## Cómo está organizado

```
compartido/
  validaciones.js      → todas las validaciones (las usan el frontend y el servidor)

servidor/
  index.js             → punto de entrada: configura Express y registra las rutas
  config.js            → puerto, carpetas, email del sitio
  db/                  → conexión, creación de tablas, datos de prueba, reinicio
  modelos/             → acceso a la base de datos (el único lugar con SQL)
  rutas/               → endpoints de la API (validan y usan los modelos)
  middlewares/         → autenticar, requiereLogin, requiereOperador, requiereAdmin, subirImagen
  servicios/correo.js  → servicio de correo simulado
  uploads/             → imágenes subidas

src/
  App.jsx              → rutas de la aplicación
  contexto/            → sesión del usuario (SesionProvider + useSesion)
  api/                 → peticiones al servidor (el único lugar con fetch)
  rutas/               → RutaPrivada, RutaOperador, RutaAdmin (protegen páginas)
  componentes/         → componentes reutilizables (comunes, inicio, proyectos, admin)
  paginas/             → páginas (publicas, usuario, admin)
  utilidades/          → formato de fechas, precios, etc.
  datos/perfil.js      → nombre, tecnologías y experiencia del desarrollador
  estilos.css          → estilos propios

public/demos/          → demos interactivas de ejemplo (HTML + JS)
```

### Separación de responsabilidades

- Solo `servidor/modelos/` escribe SQL.
- Solo `src/api/` hace `fetch` al servidor.
- Los `componentes` muestran datos. Las `paginas` los combinan y piden los datos a la API.
- Las validaciones están una sola vez, en `compartido/validaciones.js`.

## Tablas de la base

- **usuarios**: id, nombre, email, clave, rol (`usuario` / `operador` / `admin`), fechaAlta, vecesQueEntro, ultimaVez
- **sesiones**: el token de sesión de cada login (token, usuarioId, fecha)
- **proyectos**: id, titulo, descripcion, tecnologias, imagen, linkRepo, fechaAlta
- **demos**: id, proyectoId, titulo, descripcion, linkDemo
- **servicios**: id, nombre, descripcion, precioDesde
- **consultas**: id, nombre, email, tipo (`general` / `cotizacion` / `asesoria`), mensaje, estado (`pendiente` / `respondida` / `cerrada`), fecha
- **correos**: correos enviados por el servicio simulado. id, para, asunto, texto, consultaId, fecha
- **visitas**: id, usuarioId (si estaba adentro), fecha

## Cómo funciona el login

1. El usuario manda email y clave a `POST /api/auth/login`.
2. El servidor compara la clave con la encriptada (bcrypt) y, si está bien, genera un **token** al azar y lo guarda en la tabla `sesiones`.
3. El frontend guarda el token en `localStorage` y lo manda en cada petición en la cabecera `Authorization: Bearer <token>`.
4. El middleware `autenticar` busca de quién es el token y deja el usuario en `req.usuario`. Después `requiereLogin`, `requiereOperador` y `requiereAdmin` deciden si deja pasar o no.

## Cómo se cuentan las visitas

- Cada vez que alguien abre el sitio en una pestaña nueva, el frontend llama a `POST /api/visitas`.
- Si estaba logueado, la visita queda con su `usuarioId`.
- Cada login también registra una visita y suma 1 a `vecesQueEntro`.
- Con eso salen los dos contadores: **visitas totales** y **visitas de usuarios registrados**.
