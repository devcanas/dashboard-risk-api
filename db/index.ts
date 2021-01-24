import config from 'config'
const mysql = require('mysql2')

const createDBConnection = () => {
  return mysql.createConnection({
    host: config.get('database.host'),
    user: config.get('database.username'),
    password: config.get('database.password'),
    database: config.get('database.name'),
  })
}

export default createDBConnection
