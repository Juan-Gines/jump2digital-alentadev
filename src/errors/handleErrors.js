// * Error handler punto final

export default async (error, req, res, next) => {
  console.log(error)
  res
    .status(error?.status || 500)
    .json({ success: false, error: error?.message || error })
}
