import express from 'express'
const router = express.Router()
import strings from '../constants/strings'
const initController = require('../controllers/initController')

router.route(strings.routes.init.path).get(initController.getInit)

export default router
