const {Comment} =require('../db/models')

const {validarById}= require('./generic.middleware')

const validarCommentById = validarById(Comment)

module.exports ={validarCommentById}