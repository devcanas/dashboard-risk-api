import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from 'config'

import indexRouter from './routes'
import nosRouter from './routes/nos'

let port: number = config.get('port')
const app = express()

var corsOptions = {
  origin: 'http://localhost:8081',
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', indexRouter)
app.use('/nos', nosRouter)

const PORT = process.env.PORT || port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
