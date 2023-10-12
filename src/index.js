import expressApp from './config/express.js'
import './config/env.js'

const PORT = process.env.PORT || 3001
const URL = process.env.URL || 'localhost'

expressApp.listen(PORT, () => {
  console.log(`Servidor escuchando en http://${URL}:${PORT}`)
})
