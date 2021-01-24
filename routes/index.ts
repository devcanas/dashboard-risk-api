import express from 'express'
const router = express.Router()

router.get('/init', (req, res, _) => {
  res.status(200).send({
    mkay: 'noice',
  })
})

router.get('/', (req, res, _) => {
  res.status(404).send({
    status: 404,
    message: 'Not found',
  })
})

export default router
