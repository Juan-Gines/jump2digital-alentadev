// * Recurso no encontrado - 404 not found

export default async (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Error 404 - No se ha encontrado este recurso.'
  })
}
