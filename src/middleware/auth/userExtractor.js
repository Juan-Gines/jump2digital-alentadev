import jwt from 'jsonwebtoken'
import { errorMessages } from '../../constants/errorMessages.js'
import getJson from '../../utils/getJson.js'

// ! Error messages

// * Token verification return id

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
    const usersJSON = await getJson('./src/database/users.json')
    const userList = JSON.parse(usersJSON)
    const user = userList.find(u => u.id === decodedToken.id)
    if (!user) {
      throw errorMessages.unauthorized
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

export default userExtractor
