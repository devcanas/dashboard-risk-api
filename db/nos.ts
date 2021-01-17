import config from 'config'
const mysql = require('mysql2')

const createDBConnection = () => {
  return mysql.createConnection({
    host: config.get('database.nos.host'),
    user: config.get('database.nos.username'),
    password: config.get('database.nos.password'),
    database: config.get('database.nos.name'),
  })
}

export default createDBConnection
