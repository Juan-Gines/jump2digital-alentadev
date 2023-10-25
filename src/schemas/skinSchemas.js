import { z } from 'zod'
import { SkinModel } from '../models/skin.js'
import { errorMessages } from '../constants/errorMessages.js'

// * Creamos el schema que validará que los datos sean correctos

const buySchema = z.object({
  id: z.number().int().positive(),
  types: z.array(z.string()),
  type: z.string(),
  colors: z.array(z.string()),
  color: z.string(),
  price: z.number().int().positive(),
  coins: z.number().int().positive()
})
  .refine((data) => data.types.includes(data.type), { message: errorMessages.notType })
  .refine((data) => data.colors.includes(data.color), { message: errorMessages.notColor })
  .refine((data) => data.price < data.coins, { message: errorMessages.insuficientCoins })

const buySkinValidation = async (object, user) => {
  const { id, type, color } = object
  const { coins } = user
  const { skinName, category, types, colors, price } = await SkinModel.getById(id)

  //* recopilamos los datos para validar

  const schemaForValidate = {
    id,
    type,
    color,
    types,
    colors,
    price,
    coins
  }
  // * Validamos los tipos que nos llegan del body
  // * Si son correctos validamos que sean correctas las opciones de tipo y color
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

export {
  buySkinValidation
}
