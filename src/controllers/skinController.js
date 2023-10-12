const getSkins = (req, res, next) => {
  res.json({ succes: true, data: 'getSkins' })
}

const buySkin = (req, res, next) => {
  const { user } = req
  res.json({ succes: true, data: user })
}

const getMySkins = (req, res, next) => {
  const { user } = req
  res.json({ succes: true, data: user })
}

const changeSkinColor = (req, res, next) => {
  const { user } = req

  res.json({ succes: true, data: user })
}

const deleteSkin = (req, res, next) => {
  const { user } = req

  res.json({ succes: true, data: user })
}

const getSkin = (req, res, next) => {
  const { user } = req

  res.json({ succes: true, data: user })
}

export default {
  getSkins,
  buySkin,
  getMySkins,
  changeSkinColor,
  deleteSkin,
  getSkin
}
