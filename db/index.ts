const mysql = require('mysql2')
import config from 'config'

interface DatabaseConfig {
  host: string
  user: string
  password: string
  database: string
  connectTimeout: number
}

interface Query {
  queryString: string
}

class Database {
  private connection: any
  private static config: DatabaseConfig = {
    host: config.get('database.host'),
    user: config.get('database.username'),
    password: config.get('database.password'),
    database: config.get('database.name'),
    connectTimeout: config.get('database.connectTimeout'),
  }

  static shared: Database = new Database()

  private constructor(configuration: DatabaseConfig = Database.config) {
    this.connection = mysql.createConnection(configuration)
  }

  public async query(query: Query) {
    return new Promise((resolve, reject) => {
      this.connection.query(query.queryString, (err: any, result: any) => {
        if (err) return reject(err)
        return resolve(result)
      })
    })
  }
}

export default Database
