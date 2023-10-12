import express from 'express'
import { routes } from '../constants/routes.js'
import skinController from '../controllers/skinController.js'

const router = express.Router()

router.get(routes.getSkins, skinController.getSkins)

router.post(routes.buySkin, skinController.buySkin)

router.get(routes.getMySkins, skinController.getMySkins)

router.put(routes.changeSkinColor, skinController.changeSkinColor)

router.delete(routes.deleteSkin, skinController.deleteSkin)

router.get(routes.getSkin, skinController.getSkin)

export default router
