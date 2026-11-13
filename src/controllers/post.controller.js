const { Post, Tag, Comment, Post_Images, User } = require('../db/models')

const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({})
        if (!posts) {
            res.status(404).json({ message: 'Posts no encontrado' })
        }

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const getPostByPk = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findByPk(id)
        if (!post) {
            res.status(404).json({ message: 'Post no encontrado' })
        }

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const getImagesByPostId = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [{ model: Post_Images, as: 'post_images' }]
        })
        return res.status(200).json(post.post_images)
    } catch (error) {
        return res.status(500).json({ message: 'Error interno' })
    }
}

const getCommentsByPostId = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [{ model: Comment, as: 'comments' }]
        })
        const comentariosVisibles = post.comments.filter(c => c.isVisible)
        return res.status(200).json(comentariosVisibles)
    } catch (error) {
        return res.status(500).json({ message: 'Error interno' })
    }
}

const getTagsByPostId = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [{ model: Tag, as: 'tags' }]
        })
        return res.status(200).json(post.tags)
    } catch (error) {
        return res.status(500).json({ message: 'Error interno' })
    }
}

const addImageToPost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id)
        if (!post) return res.status(404).json({ message: 'Post no encontrado' })
        const nuevaImagen = await Post_Images.create({
            PostId: post.id,
            url: req.body.url
        })
        return res.status(201).json(nuevaImagen)
    } catch (error) {
        return res.status(500).json({ message: 'Error interno' })
    }
}

const createCommentByPostId = async (req, res) => {
    try {
        // Verifica que el usuario que comenta exista
        const { User } = require('../db/models')
        const user = await User.findByPk(req.body.UserId)
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
        const nuevoComentario = await Comment.create({
            UserId: req.body.UserId,
            PostId: req.params.id,    // viene de la URL
            content: req.body.content
        })
        return res.status(201).json(nuevoComentario)
    } catch (error) {
        return res.status(500).json({ message: 'Error interno' })
    }
}

const addTagToPost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id)

        const tag = await Tag.findOne({
            where: { id: req.body.idTag }
        })

        if (!tag) {
            return res.status(404).json({ message: 'Tag no encontrado' })
        }

        await post.addTags(tag)
        res.status(201).json({ mensaje: `El tag ${tag.name} fue agregado al post con id ${post.id}` })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error interno' })
    }
}

const updatePost = async (req, res) => {
    try {
        const id = req.params.id
        const modifiedPost = req.body
        const post = await Post.findByPk(id)

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' })
        }

        await post.update(modifiedPost)
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ message: 'Error interno' })

    }
}

const deletePost = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findByPk(id)

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' })
        }

        await post.destroy()
        res.status(200).json({ message: `Post con id: ${id} eliminado correctamente` })
    } catch (e) {
        res.status(500).json({ message: "Error interno" })
    }
}


const deleteImageToPost = async (req, res) => {
    try {
        const imagen = await Post_Images.findOne({
            where: {
                id: req.params.imgId,
                PostId: req.params.id
            }
        })
        if (!imagen) return res.status(404).json({ message: 'Imagen no encontrada en ese post' })
        await imagen.destroy()
        return res.status(200).json({ message: 'Imagen eliminada correctamente' })
    } catch (error) {
        return res.status(500).json({ message: 'Error interno' })
    }
}

const dissociateTagToPost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id)
        if (!post) return res.status(404).json({ message: 'Post no encontrado' })
        const tag = await Tag.findByPk(req.params.tagId)
        if (!tag) return res.status(404).json({ message: 'Tag no encontrado' })
        await post.removeTag(tag)
        return res.status(200).json({ message: `Tag "${tag.name}" desasociado del post` })
    } catch (error) {
        return res.status(500).json({ message: 'Error interno' })
    }
}



module.exports = {
    getPosts, getPostByPk, getImagesByPostId, getCommentsByPostId, getTagsByPostId, addImageToPost,
    createCommentByPostId, addTagToPost, updatePost, deletePost, deleteImageToPost, dissociateTagToPost
}