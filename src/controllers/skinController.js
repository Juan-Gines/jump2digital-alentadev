import { SkinModel } from '../models/skin.js'
import { buySkinValidation } from '../schemas/skinSchemas.js'
import { CustomError } from '../errors/CustomError.js'

const getSkins = (req, res, next) => {
  SkinModel.getAll()
    .then(data => res.json({ succes: true, data }))
    .catch(error => next(error))
}

const buySkin = (req, res, next) => {
  const { user, body } = req
  const result = buySkinValidation(body, user)
  if (result.error) throw new CustomError(400, JSON.parse(result.error.message))

  SkinModel.create(user, result.data)
    .then(skin => {
      if (skin) {
        res.json({ succes: true, skin })
      }
    })
    .catch(error => next(error))
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
