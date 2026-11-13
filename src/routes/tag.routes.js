const { Router } = require('express')
const router = Router()
const { controllerTag } = require('../controllers')
const {validarTagById} =require('../middlewares/tag.middleware')

const {validarSchema} = require('../middlewares/generic.middleware')
const {schemaTag} = require('../schemas/tag.schema')

router.get('/', controllerTag.getTags)
router.get('/:id', validarTagById,controllerTag.getTagByPk)
router.post('/', validarSchema(schemaTag), controllerTag.createTag)
router.put('/:id',validarTagById, validarSchema(schemaTag), controllerTag.updateTag)
router.delete('/:id', validarTagById, controllerTag.deleteTag)

module.exports = router