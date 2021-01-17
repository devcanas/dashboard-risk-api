import express from 'express'
const router = express.Router()
const nosController = require('../controllers/nosController')

router.route('/date/:date').get(nosController.getNosDate)
router.route('/date/:date/range/:range').get(nosController.getNosDateRange)
router.route('/concelho/:concelho').get(nosController.getNosConcelho)

router.route('*').get((req, res, _) => {
  res.status(404).send()
})

export default router
