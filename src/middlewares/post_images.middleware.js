const {Post_Images,Post} =require('../db/models')

const {validarById}= require('./generic.middleware')

const validarPost_ImagesById = validarById(Post_Images)

const validarPostById = validarById(Post)

module.exports ={validarPost_ImagesById , validarPostById}