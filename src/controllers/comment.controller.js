const { Comment } = require('../db/models')

const getComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({})
        if (!comments) {
            res.status(404).json({ message: 'Comentarios no encontrado' })
        }

        res.status(200).json(comments)

    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const getCommentByPk = async (req, res) => {
    try {
        const id = req.params.id
        const comment = await Comment.findByPk(id)
        if (!comment) {
            res.status(404).json({ message: 'Comentario no encontrado' })
        }

        res.status(200).json(comment)

    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const createComment = async (req, res) => {
    try {
        const newComment = await Comment.create(req.body)
        if (!newComment) {
            return res.status(404).json({ message: 'Comentario no encontrado' })
        }

        res.status(201).json(newComment)
    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const updateComment = async (req, res) => {
    try {
        const id = req.params.id
        const modifiedComment = req.body
        const comment = await Comment.findByPk(id)

        if (!comment) {
            return res.status(404).json({ message: 'Comentario no encontrado' })
        }

        await comment.update(modifiedComment)
        res.status(200).json(comment)

    } catch (error) {
        res.status(500).json({ message: 'Error interno' })

    }
}

const deleteComment = async (req, res) => {
    try {
        const id = req.params.id
        const comment = await Comment.findByPk(id)

        if (!comment) {
            return res.status(404).json({ message: 'Comentario no encontrado' })
        }

        await comment.destroy()
        res.status(200).json({ message: `Comentario con id: ${id} eliminado correctamente` })
    } catch (e) {
        res.status(500).json({ message: "Error interno" })
    }
}

module.exports = { getComments, getCommentByPk, createComment, updateComment, deleteComment }