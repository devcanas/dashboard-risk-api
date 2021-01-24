import database from './index'

const performQuery = (queryString: string, callback: any) => {
  const db = database()
  db.connect()
  db.query(queryString, callback)
  db.end()
}

export default performQuery
