const getSkins = (req, res, next) => {
  res.json({ succes: true, data: 'getSkins' })
}

const buySkin = (req, res, next) => {
  res.json({ succes: true, data: 'buySkin' })
}

const getMySkins = (req, res, next) => {
  res.json({ succes: true, data: 'getMySkins' })
}

const changeSkinColor = (req, res, next) => {
  res.json({ succes: true, data: 'changeSkinColor' })
}

const deleteSkin = (req, res, next) => {
  res.json({ succes: true, data: 'deleteSkin' })
}

const getSkin = (req, res, next) => {
  res.json({ succes: true, data: 'getSkin' })
}

export default {
  getSkins,
  buySkin,
  getMySkins,
  changeSkinColor,
  deleteSkin,
  getSkin
}
