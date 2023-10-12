import express from 'express'
import cors from 'cors'
import { routes } from '../constants/routes.js'
import skinRoutes from '../routes/skins.routes.js'
import notFound from '../errors/notFound.js'
import handleErrors from '../errors/handleErrors.js'

const expressApp = express()

expressApp.disable('x-powered-by')

// Middlewares
expressApp.use(express.json())
expressApp.use(cors())

// Routes
expressApp.use(routes.skins, skinRoutes)

// Errors
expressApp.use(notFound)
expressApp.use(handleErrors)

export default expressApp
