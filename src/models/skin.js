import mysql from 'mysql2/promise'
import getJson from '../utils/getJson.js'
import { CustomError } from '../errors/CustomError.js'

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

const connetion = await mysql.createConnection(config)
export class SkinModel {
  static async getAll () {
    return await getJson('./src/database/skins.json')
  }

  static async getById (id) {
    return await getJson('./src/database/skins.json', id)
  }

  static async create (user, data) {
    const [result] = await connetion.query('INSERT INTO skins (skin_id, user_id, name, category, type, color, price) VALUES (?,?,?,?,?,?,?)', [id, user.id, skinName, category, data.type, data.color, price])

    const [skin] = await connetion.query('SELECT * FROM skins WHERE id=?', [result.insertId])

    return skin[0]
  }
}
