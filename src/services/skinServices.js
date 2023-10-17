import getJson from '../utils/getJson.js'

const getSkins = async () => {
  return await getJson('./src/database/skins.json')
}

const getSkin = async () => {

}

export default {
  getSkins,
  getSkin
}
