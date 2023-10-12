// * Recurso no encontrado - 404 not found

import { errorMessages } from '../constants/errorMessages.js'

export default async (req, res) => {
  res.status(404).json({
    success: false,
    error: errorMessages.notFound
  })
}
