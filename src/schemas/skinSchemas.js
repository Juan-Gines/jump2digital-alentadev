import { z } from 'zod'

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
  if (result.error) {
    return result
  } else {
    const errors = []
    if (!types.includes(type)) errors.push('Skin no disponible para esta clase')
    if (!colors.includes(color)) errors.push('Skin no disponible en este color')
    if (price > coins) errors.push('No tienes suficientes coins para comprar este skin')

    return errors
  }
}
const skin = await getJson('./src/database/skins.json', data.id)

// * Validamos en el modelo si las opciones enviadas por el controlador
// * se corresponden a un Skin válido (class, color, price)

const createNewSkinValidation = (data, skin, coins) => {
  const { color, type } = data
  const errors = []
  if (!types.includes(type)) errors.push('Skin no disponible para esta clase')
  if (!colors.includes(color)) errors.push('Skin no disponible en este color')
  if (price > coins) errors.push('No tienes suficientes coins para comprar este skin')

  return errors
}

export {
  buySkinValidation,
  createNewSkinValidation
}
