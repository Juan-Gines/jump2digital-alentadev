import { z } from 'zod'
import { SkinModel } from '../models/skin.js'
import { errorMessages } from '../constants/errorMessages.js'
import { CustomError } from '../errors/CustomError.js'

// * Creamos el schema que validará que los datos sean correctos

const buySchema = z.object({
  id: z.number().int().positive(),
  skinName: z.string(),
  category: z.string(),
  types: z.array(z.string()),
  type: z.string(),
  colors: z.array(z.string()),
  color: z.string(),
  price: z.number().int().positive(),
  coins: z.number().int().positive()
})
  .refine((data) => data.types.includes(data.type), { message: errorMessages.notType })
  .refine((data) => data.colors.includes(data.color), { message: errorMessages.notColor })
  .refine((data) => data.price <= data.coins, { message: errorMessages.insuficientCoins })

// * Función de validación de la ruta buyskin

const buySkinValidation = async (body, user) => {
  const { id, type, color } = body
  const { coins } = user

  // * Recuperamos el skin

  const { skinName, category, types, colors, price } = await SkinModel.getById(id)

  // * recopilamos los datos para validar

  const schemaForValidate = {
    id,
    skinName,
    category,
    type,
    color,
    types,
    colors,
    price,
    coins
  }
  // * Validamos los tipos que nos llegan del body
  // * Si son correctos validamos que sean válidas las opciones de tipo y color
  // * Y si el usuario tiene suficientes coins para comprar el skin

  const result = buySchema.safeParse(schemaForValidate)

  // * Si todo sale bien devolvemos los datos limpios para meter en la BBDD

  if (result.success) {
    result.data = [
      id,
      user.id,
      skinName,
      category,
      type,
      color,
      price
    ]
  }

  return result
}

// * Schema de validación del cambio de color

const changeColorSchema = z.object({
  id: z.number().int().positive(),
  colors: z.array(z.string()),
  newColor: z.string(),
  color: z.string()
})
  .refine((data) => data.color !== data.newColor, { message: errorMessages.colorMatch })
  .refine((data) => data.colors.includes(data.newColor), { message: errorMessages.notColor })

// * Función de validación de la ruta color
const changeColorValidation = async (body, user) => {
  const { id, newColor } = body

  // * Recuperamos el skin si existe y comprovamos que sea del usuario
  // eslint-disable-next-line camelcase
  const skin = await SkinModel.getSkinFromUserById(id)
  if (!skin) {
    throw new CustomError(404, errorMessages.notFound)
  } else {
    if (skin.user_id !== user.id) throw new CustomError(401, errorMessages.unauthorized)
  }

  // * Recuperamos las opciones de colores del skin
  const { colors } = await SkinModel.getById(skin.skin_id)

  // * Datos para validar
  const schemaForValidate = {
    id,
    newColor,
    color: skin.color,
    colors
  }

  // * Validamos los datos de entrada
  // * Que el color no sea el mismo que ya tiene el skin
  // * Y que el color este disponible para esta skin
  const result = changeColorSchema.safeParse(schemaForValidate)

  // * Si todo sale bien devolvemos los datos limpios para meter en la BBDD
  if (result.success) {
    result.data = [
      newColor,
      id
    ]
  }

  return result
}
export {
  buySkinValidation,
  changeColorValidation
}
