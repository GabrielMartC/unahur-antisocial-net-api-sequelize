const { Router } = require('express')
const router = Router()
const { controllerPost } = require('../controllers')
//traemos el middleware
const {validarPostById,validarUserPostById} =require("../middlewares/post.middleware")
const {validarSchema} = require('../middlewares/generic.middleware')
const {schemaPostImage} = require('../schemas/tag.schema')


router.get('/', controllerPost.getPosts)
router.get('/:id',validarPostById, controllerPost.getPostByPk)
router.get('/:id/images',validarPostById, controllerPost.getImagesByPostId) //Obtener todas las imágenes asociadas a una publicación
router.get('/:id/comment',validarPostById, controllerPost.getCommentsByPostId) //Obtener los comentarios visibles de una publicación en particular
router.get('/:id/tag',validarPostById, controllerPost.getTagsByPostId) //Obtener todas las etiquetas asociadas a una publicación

router.post('/:id/images',validarPostById, validarSchema(schemaPostImage), controllerPost.addImageToPost) //Agregar una imagen a una publicación mediante su URL
router.post('/:id/tag',validarPostById, validarSchema(schemaTag),controllerPost.addTagToPost) //agregar un tag a un post

router.put('/:id',validarPostById, controllerPost.updatePost)

router.delete('/:id',validarPostById, controllerPost.deletePost)
router.delete('/:id/images/:imgId',validarPostById, controllerPost.deleteImageToPost) //Quitar una imagen de una publicación en particular
router.delete('/:id/tag/:tagId',controllerPost.dissociateTagToPost) //Desasociar una etiqueta de una publicación


module.exports = router