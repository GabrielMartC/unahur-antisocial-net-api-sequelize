const {Post,User} =require('../db/models')

const {validarById}= require('./generic.middleware')

const validarPostById = validarById(Post)

const validarUserPostById = validarById(User)

module.exports ={validarPostById,validarUserPostById}