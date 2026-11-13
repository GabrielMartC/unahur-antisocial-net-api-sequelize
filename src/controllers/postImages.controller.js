const { Post_Images } = require('../db/models')

const getPostsImages = async (req, res) => {
    try {
        const posts = await Post_Images.findAll({})
        if (!posts) {
            res.status(404).json({ message: 'Posts no encontrado' })
        }

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const getPostImageByPk = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post_Images.findByPk(id)
        if (!post) {
            res.status(404).json({ message: ' Post_Images no encontrado' })
        }

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const createPost_image = async (req, res) => {
    try {
        const newPost = await Post_Images.create(req.body)
        if (!newPost) {
            return res.status(404).json({ message: 'Post no encontrado' })
        }

        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const deletePost_image = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post_Images.findByPk(id)

        if (!post) {
            return res.status(404).json({ message: 'Post_Images no encontrado' })
        }

        await post.destroy()

        res.status(200).json({ message: `Post con id: ${id} eliminado correctamente` })
    } catch (e) {
        res.status(500).json({ message: "Error interno" })
    }
}


const updatePost_image = async (req, res) => {
    try {
        const id = req.params.id
        const modifiedPost = req.body
        const post = await Post_Images.findByPk(id)

        if (!post) {
            return res.status(404).json({ message: 'Post_Images no encontrado' })
        }

        await post.update(modifiedPost)
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ message: 'Error interno' })

    }
}

module.exports = { getPostsImages, getPostImageByPk, createPost_image, updatePost_image, deletePost_image }