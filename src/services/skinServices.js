import getJson from '../utils/getJson.js'

const getSkins = async () => {
  return await getJson('./src/database/skins.json')
}

const getSkin = async (id) => {
  return await getJson('./src/database/skins.json', id)
}

export default {
  getSkins,
  getSkin
}
