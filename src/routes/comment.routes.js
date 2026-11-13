const {Router} = require('express')
const router = Router()
const {controllerComment} = require('../controllers')

//traigo el middleware
const {validarCommentById} =require('../middlewares/comment.middleware')

router.get('/',controllerComment.getComments)
// // router.get('/:id',validarCommentById,controllerComment.getCommentByPk)
// // router.post('/', controllerComment.createComment)
router.put('/:id', validarCommentById,controllerComment.updateComment)
router.delete('/:id', validarCommentById,controllerComment.deleteComment)

module.exports = router