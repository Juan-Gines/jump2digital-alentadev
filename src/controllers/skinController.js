import { SkinModel } from '../models/skin.js'

const getSkins = (req, res, next) => {
  SkinModel.getAll()
    .then(data => res.json({ succes: true, data }))
    .catch(error => next(error))
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
  const { id } = req.params
  res.json({ succes: true, data: { user, id } })
}

const getSkin = (req, res, next) => {
  const { id } = req.params
  console.log(id)
  SkinModel.getById(id)
    .then(data => res.json({ succes: true, data }))
    .catch(error => next(error))
}

export default {
  getSkins,
  buySkin,
  getMySkins,
  changeSkinColor,
  deleteSkin,
  getSkin
}
