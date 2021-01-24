import express from 'express'
import strings from '../constants/strings'
const router = express.Router()
const riskIqdController = require('../controllers/riskIqdController')

const { date, dateRange } = strings.routes.riskIqd
router.route(date).get(riskIqdController.getRiskIqdDate)
router.route(dateRange).get(riskIqdController.getRiskIqdDateRange)

router.route('*').get((req, res, _) => {
  res.status(404).send()
})

export default router
