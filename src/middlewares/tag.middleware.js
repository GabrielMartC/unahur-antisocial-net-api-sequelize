const {Tag} =require('../db/models')

const {validarById}= require('./generic.middleware')

const validarTagById = validarById(Tag)

module.exports ={validarTagById}