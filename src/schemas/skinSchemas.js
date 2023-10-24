import { z } from 'zod'
import { SkinModel } from '../models/skin'

// * Validamos en el controlador los datos de entrada del body para la ruta buySkin

const buySchema = z.object({
  id: z.number().int().positive(),
  type: z.string(),
  color: z.string()
})

const buySkinValidation = async (object, user) => {
  // * Validamos los tipos que nos llegan del body
  const result = buySchema.safeParse(object)

  // * Si son correctos validamos que sean correctas las opciones de tipo y color
  // * Y si el usuario tiene suficientes coins para comprar el skin
  if (!result.error) {
    const { id, type, color } = result.data
    const { skinName, category, types, colors, price } = SkinModel.getById(id)
    if (!types.includes(type)) result.error.message.push('Skin no disponible para esta clase')
    if (!colors.includes(color)) result.error.message.push('Skin no disponible en este color')
    if (price > user.coins) result.error.message.push('No tienes suficientes coins para comprar este skin')

    if (!result.error) {
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
  }

  return result
}
// * Validamos en el modelo si las opciones enviadas por el controlador
// * se corresponden a un Skin válido (class, color, price)

export {
  buySkinValidation
}
