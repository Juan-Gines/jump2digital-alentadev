import jwt from 'jsonwebtoken'
import { errorMessages } from '../../constants/errorMessages.js'
import getJson from '../../utils/getJson.js'
import { CustomError } from '../../errors/CustomError.js'

// ! Error messages

// * Verificamos el token y devolvemos el usuario

const userExtractor = async (req, res, next) => {
  const { authorization } = req.headers
  try {
    if (!authorization) {
      throw errorMessages.unauthorized
    }

    const token = authorization.split(' ')[1]

    if (!token) {
      throw errorMessages.unauthorized
    }
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    const user = await getJson('./src/database/users.json', decodedToken.id)
    if (!user) {
      throw errorMessages.unauthorized
    }
    req.user = user
    next()
  } catch (error) {
    next(new CustomError(401, error))
  }
}

export default userExtractor
