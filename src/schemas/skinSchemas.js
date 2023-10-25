import { z } from 'zod'
import { SkinModel } from '../models/skin.js'
import { errorMessages } from '../constants/errorMessages.js'

// * Validamos en el controlador los datos de entrada del body para la ruta buySkin

const buySchema = z.object({
  id: z.number().int().positive(),
  colors: z.array(z.string),
  types: z.array(z.string),
  type: z.string(),
  color: z.string(),
  price: z.number().int().positive(),
  coins: z.number().int().positive(),
  notColor: z.string(),
  notType: z.string(),
  insuficientCoins: z.string()
})
// .refine((data) => data.types.includes(data.type), { message: (data) => data.notType })

// Define un esquema que valida si un string está dentro de un array
// const stringInArraySchema = z.object({
//   value: z.string(),
//   array: z.array(z.string())
// }).refine((data) => data.array.includes(data.value), { message: (data) => data.message })

// // Función para validar
// const validateStringInArray = (data) => {
//   const result = stringInArraySchema.safeParse(data)
//   console.log(result)
//   return result.success
// }

const buySkinValidation = async (object, user) => {
  const { id, type, color } = object
  const { coins } = user
  const { skinName, category, types, colors, price } = await SkinModel.getById(id)

  // * Mensajes de error
  const { notColor, notType, insuficientCoins } = errorMessages

  //* recopilamos los datos para validar

  const schemaForValidate = {
    id,
    type,
    color,
    types,
    colors,
    price,
    coins,
    notColor,
    notType,
    insuficientCoins
  }
  console.log(schemaForValidate)
  // * Validamos los tipos que nos llegan del body
  // * Si son correctos validamos que sean correctas las opciones de tipo y color
  // * Y si el usuario tiene suficientes coins para comprar el skin

  const result = buySchema.safeParse(schemaForValidate)

  console.log(result)

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
