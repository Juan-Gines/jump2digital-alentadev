import { SkinModel } from '../models/skin.js'
import { buySkinValidation, changeColorValidation } from '../schemas/skinSchemas.js'
import { CustomError } from '../errors/CustomError.js'

// * Retornamos las skills disponibles
const getSkins = (req, res, next) => {
  SkinModel.getAll()
    .then(data => res.json({ succes: true, data }))
    .catch(error => next(error))
}

// * Compramos la skin
const buySkin = (req, res, next) => {
  const { user, body } = req
  // Validamos los datos y comprobamos que el usuario tenga coins
  buySkinValidation(body, user)
    .then(result => {
      if (!result.success) throw new CustomError(400, JSON.parse(result.error.message))
      return result
    })
    .then(result => {
      // Si los datos son correctos procedemos a crear el skin
      SkinModel.create(result.data)
        .then(skin => res.status(201).json({ succes: true, skin }))
        .catch(error => next(error))
    })
    .catch(error => next(error))
}

// * Obtenemos todas las skins de un usuario
const getMySkins = (req, res, next) => {
  const { user } = req
  SkinModel.getSkinsFromUser(user.id)
    .then(data => res.json({ succes: true, data }))
    .catch(error => next(error))
}

// * Cambiamos el color a una skin
const changeSkinColor = (req, res, next) => {
  const { user, body } = req
  // Validamos los datos
  changeColorValidation(body, user)
    .then(result => {
      if (!result.success) throw new CustomError(400, JSON.parse(result.error.message))
      return result
    })
    .then(result => {
      SkinModel.changeColor(result.data)
        .then(skin => res.json({ succes: true, skin }))
        .catch(error => next(error))
    })
    .catch(error => next(error))
}

const deleteSkin = (req, res, next) => {
  const { user } = req
  const { id } = req.params
  SkinModel.delete(user, id)
    .then(data => res.json({ succes: true, data }))
    .catch(error => next(error))
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
