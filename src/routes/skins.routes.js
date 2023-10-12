import express from 'express'
import { routes } from '../constants/routes.js'
import skinController from '../controllers/skinController.js'
import userExtractor from '../middleware/auth/userExtractor.js'

const router = express.Router()

router.get(routes.getSkins, skinController.getSkins)

router.post(routes.buySkin, userExtractor, skinController.buySkin)

router.get(routes.getMySkins, userExtractor, skinController.getMySkins)

router.put(routes.changeSkinColor, userExtractor, skinController.changeSkinColor)

router.delete(routes.deleteSkin, userExtractor, skinController.deleteSkin)

router.get(routes.getSkin, userExtractor, skinController.getSkin)

export default router
