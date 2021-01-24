import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from 'config'

import indexRouter from './routes'
import nosRouter from './routes/nos'
import riskIqdRouter from './routes/riskIqd'

let port: number = config.get('port')
const app = express()

var corsOptions = {
  origin: 'http://localhost:5000',
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', indexRouter)
app.use('/nos', nosRouter)
app.use('/riskIqd', riskIqdRouter)

const PORT = process.env.PORT || port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
