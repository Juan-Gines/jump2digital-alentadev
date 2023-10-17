import { readFile } from 'fs/promises'
import { errorMessages } from '../constants/errorMessages.js'

const getJson = (url, id = null) => {
  return new Promise((resolve, reject) => {
    readFile(url, 'utf-8')
      .then(content => JSON.parse(content))
      .then(data => {
        data = id ? data.find(d => d.id === id) : data
        resolve(data)
      })
      .catch(error => {
        console.log(error)
        reject(errorMessages.loadFile)
      })
  })
}

export default getJson
