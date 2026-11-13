const { Router } = require('express')
const router = Router()
const { controllerPostImages } = require('../controllers')


const {validarPost_ImagesById , validarPostById} = require('../middlewares/post_images.middleware')

// // router.get('/', controllerPostImages.getPostsImages)
// // router.get('/:id', validarPost_ImagesById,controllerPostImages.getPostImageByPk)
// // router.post('/:id',validarPostById,controllerPostImages.createPost_image)
// // router.delete('/:id',validarPost_ImagesById,controllerPostImages.deletePost_image)
// // router.put('/:id',validarPost_ImagesById,controllerPostImages.updatePost_image)

module.exports = router