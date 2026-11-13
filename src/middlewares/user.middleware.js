const  {User} =require('../db/models')

const {validarById}= require('./generic.middleware')

const validarUserById = validarById(User)

module.exports ={validarUserById}