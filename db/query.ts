import Database from './index'

const performQuery = (queryString: string): any => {
  return Database.shared.query({ queryString })
}

export default performQuery
