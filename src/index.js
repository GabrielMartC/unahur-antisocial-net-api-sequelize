require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const rutas = require('./routes')
const { sequelize } = require('./db/models')

app.use(express.json())
app.use('/users', rutas.userRutas)
app.use('/post', rutas.postRutas)
app.use('/comment', rutas.commentRutas)
app.use('/images', rutas.postImageRutas)
app.use('/tag', rutas.tagRutas)

sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada')
    app.listen(PORT, () => {
      console.log('LA APP ESCUCHA EN EL PUERTO ' + PORT)


    })
  })
  .catch(err => {
    console.error('Error al sincronizar', err)
  })
