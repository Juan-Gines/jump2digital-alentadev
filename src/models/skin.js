import mysql from 'mysql2/promise'
import getJson from '../utils/getJson.js'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'skinsdb'
}

const connetion = await mysql.createConnection(config)
export class SkinModel {
  static async getAll () {
    return await getJson('./src/database/skins.json')
  }

  static async getById (id) {
    return await getJson('./src/database/skins.json', id)
  }
}
