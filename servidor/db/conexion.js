// Abre el archivo de la base de datos (SQLite). Si no existe, lo crea solo.
// Se usa el módulo SQLite que trae Node (node:sqlite), así no hay que instalar ni compilar nada.
import { DatabaseSync } from 'node:sqlite'
import { rutaBaseDeDatos } from '../config.js'

const db = new DatabaseSync(rutaBaseDeDatos)
db.exec('pragma foreign_keys = on')

export default db
