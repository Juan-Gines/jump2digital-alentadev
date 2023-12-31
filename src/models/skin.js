import mysql from 'mysql2/promise'
import getJson from '../utils/getJson.js'
import { CustomError } from '../errors/CustomError.js'
import { errorMessages } from '../constants/errorMessages.js'
import { messages } from '../constants/messages.js'
import { dbConfig } from '../config/db.js'

const connetion = await mysql.createConnection(dbConfig)
export class SkinModel {
  // Recuperamos todos los skins
  static async getAll () {
    return await getJson('./src/database/skins.json')
  }

  // Recuperamos un skin
  static async getById (id) {
    return await getJson('./src/database/skins.json', id)
  }

  // Creamos un skin
  static async create (data) {
    const [result] = await connetion.query('INSERT INTO skins (skin_id, user_id, name, category, type, color, price) VALUES (?,?,?,?,?,?,?)', data)

    const [skin] = await connetion.query('SELECT * FROM skins WHERE id=?', [result.insertId])
    return skin[0]
  }

  // Cambiamos color de un skin de un usuario
  static async changeColor (data) {
    const [result] = await connetion.query('UPDATE skins SET color = ? WHERE id = ?', data)

    if (result.affectedRows === 1) {
      const skin = await this.getSkinFromUserById(data[1])
      return skin
    } else {
      throw new CustomError(500, errorMessages.colorChange)
    }
  }

  // Obtenemos un skin comprado de un usuario
  static async getSkinFromUserById (id) {
    const [skin] = await connetion.query('SELECT * FROM skins WHERE id = ?', [id])

    return skin[0]
  }

  // Obtenemos todas las skins de un usuario
  static async getSkinsFromUser (id) {
    const [skins] = await connetion.query('SELECT * FROM skins WHERE user_id=?', [id])
    if (skins.length === 0) return { message: messages.notSkins }
    return skins
  }

  // Borramos una skin comprada de un usuario
  static async delete (user, id) {
    const [result] = await connetion.query('SELECT * FROM skins WHERE id=?', [id])
    const skin = result[0]
    if (!skin) {
      throw new CustomError(404, errorMessages.notFound)
    } else if (skin.user_id === user.id) {
      await connetion.query('DELETE FROM skins WHERE id=?', [id])
      return { message: messages.skinDeleted }
    } else {
      throw new CustomError(400, errorMessages.unauthorized)
    }
  }
}
