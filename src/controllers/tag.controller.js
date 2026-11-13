const { Tag } = require('../db/models')

const getTags = async (req, res) => {
    try {
        const tags = await Tag.findAll({})

        res.status(200).json(tags)

    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const getTagByPk = async (req, res) => {
    try {
        const id = req.params.id
        const tag = await Tag.findByPk(id)

        res.status(200).json(tag)

    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const createTag = async (req, res) => {
    try {
        const newTag = await Tag.create(req.body)

        res.status(201).json(newTag)
    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const updateTag = async (req, res) => {
    try {
        const id = req.params.id
        const modifiedTag = req.body
        const tag = await Tag.findByPk(id)

        await tag.update(modifiedTag)
        res.status(200).json(tag)

    } catch (error) {
        res.status(500).json({ message: 'Error interno' })

    }
}

const deleteTag = async (req, res) => {

    try {
        const id = req.params.id
        const tag = await Tag.findByPk(id)

        const cantPostAsociados = await tag.countPosts() //cuenta sus asociaciones con posts

        if (cantComponentesAsociados > 0) {
            //409 conflict
            res.status(409).json({ message: `no se puede eliminar tag si tiene posts asociados` });
            return
        }

        await tag.destroy()
        res.status(200).json({ message: `Tag con id: ${id} eliminado correctamente` })
    } catch (e) {
        res.status(500).json({ message: "Error interno" })
    }
}

module.exports = { getTags, getTagByPk, createTag, updateTag, deleteTag }