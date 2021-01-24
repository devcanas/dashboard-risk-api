import express from 'express'
import strings from '../constants/strings'
const router = express.Router()
const nosController = require('../controllers/nosController')

const { date, dateRange, concelho } = strings.routes.nos
router.route(date).get(nosController.getNosDate)
router.route(dateRange).get(nosController.getNosDateRange)
router.route(concelho).get(nosController.getNosConcelho)

router.route('*').get((req, res, _) => {
  res.status(404).send()
})

export default router
