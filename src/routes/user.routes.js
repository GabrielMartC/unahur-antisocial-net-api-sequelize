const { Router } = require('express')
const router = Router()
const { controllerUser } = require('../controllers')
const {validarUserById} = require('../middlewares/user.middleware')
// const {validarPostById} = require('../middlewares/post.middleware')
// const {validarCommentById} = require('../middlewares/comment.middleware')
const {validarSchema} = require('../middlewares/generic.middleware')
const {schemaUser} = require('../schemas/user.schema')
const {schemaPost} = require('../schemas/post.schema')
const {schemaComment} = require('../schemas/comment.schema')


router.get('/', controllerUser.getUser)
router.get('/:id',validarUserById, controllerUser.getUserByPk)
router.get('/:id/post',validarUserById, controllerUser.getPostsByUserId) // Obtener todas las publicaciones de un usuario en particular.
router.get('/:id/comment',validarUserById, controllerUser.getCommentsByUserId) // Obtener todos los comentarios realizados por un usuario en particular

router.post('/', validarSchema(schemaUser), controllerUser.createUser)
router.post('/:id/post', validarUserById, validarSchema(schemaPost), controllerUser.createPostByUserId) //Usuario crea una publicacion
router.post('/:id/comment', validarUserById, validarSchema(schemaComment), controllerUser.createCommentByUserId) //Usuario crea un comentario, en un post

router.put('/:id',validarUserById, validarSchema(schemaUser), controllerUser.updateUser)
// router.put('/:id/post/:idPost',validarUserById, validarPostById, validarSchema(schemaPost), controllerUser.updatePostByUserId) //usuario actualiza un posteo
// router.put('/:id/comment/:idComment',validarUserById, validarCommentById, validarSchema(schemaComment), controllerUser.updateCommentByUserId) //usuario actualiza un comentario de un posteo

router.delete('/:id',validarUserById, controllerUser.deleteUser)
// router.delete('/:id/post/:idPost',validarUserById, validarPostById, controllerUser.deletePostByUserId) //usuario elimina un posteo
// router.delete('/:id/comment/:idComment',validarUserById, validarCommentById, controllerUser.deleteCommentByUserId) //usuario elimina un comentario de un posteo

module.exports = router