import express from 'express'
import strings from '../constants/strings'
const router = express.Router()
const riskIqdController = require('../controllers/riskIqdController')

const { date, colors } = strings.routes.riskIqd
router.route(colors).get(riskIqdController.getRiskIqdColors)
router.route(date).get(riskIqdController.getRiskIqdDate)

router.route('*').get((req, res, _) => {
  res.status(404).send()
})

export default router
