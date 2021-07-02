import fs from 'fs'

interface ReqValues {
  date: string
  isPred: boolean
}

export default (req: ReqValues) => {
  const documentRoot = process.env.PWD
  const filename = `${req.isPred ? 'pred_' : ''}${req.date}_riskIqd.js`
  const filepath = `${documentRoot}/parsedData/values/${filename}`
  return JSON.parse(fs.readFileSync(filepath, 'utf8'))
}
