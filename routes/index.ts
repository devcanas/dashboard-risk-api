import express from 'express'
const router = express.Router()

router.get('/', (req, res, _) => {
  res.status(404).send({
    status: 404,
    message: 'Not found',
  })
})

export default router
