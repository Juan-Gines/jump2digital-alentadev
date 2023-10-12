// * Error handler end point

export default async (error, req, res) => {
  res
    .status(error?.status || 500)
    .json({ success: false, error: error?.message || error })
}
