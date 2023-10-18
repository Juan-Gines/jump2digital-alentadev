import { readFile } from 'fs/promises'
import { errorMessages } from '../constants/errorMessages.js'
import { CustomError } from '../errors/CustomError.js'

// * Funcion que recibe la url de un archivo json y lo devuelve formateado.
// * Si recibe una id (opcional) devuelve el elemento.

const getJson = (url, id = null) => {
  return new Promise((resolve, reject) => {
    readFile(url, 'utf-8')
      .then(content => JSON.parse(content))
      .then(data => {
        console.log(id)
        const newData = id ? data.find(d => d.id === +id) : data
        if (newData) resolve(newData)
        else reject(new CustomError(404, errorMessages.notFound))
      })
      .catch(error => {
        console.log(error)
        reject(errorMessages.loadFile)
      })
  })
}

export default getJson
