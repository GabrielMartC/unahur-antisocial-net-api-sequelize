const { User } = require('../db/models')
const { Post } = require('../db/models')
const { Comment } = require('../db/models')

const getUser = async (req, res) => {
    try {
        const users = await User.findAll({})
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const getUserByPk = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id)

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const getPostsByUserId = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        const posteos = await user.getPosts()

        res.status(200).json(posteos)
    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const getCommentsByUserId = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        const comentarios = await user.getComments()

        res.status(200).json(comentarios)
    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const createUser = async (req, res) => {
    try {
        const usuarioExistente = await User.findOne({
            where: { nickName: req.body.nickName } //trae user con ese nickname si hubiere
        });

        if (usuarioExistente) {
            //409 conflict
            return res.status(409).json({ message: "El nickname ya esta registrado" });
        }

        const newUser = await User.create(req.body)

        res.status(201).json(newUser) //creado
    } catch (error) {
        res.status(500).json({ message: 'Error interno' })
    }
}

const createPostByUserId = async (req, res) => {
    try {
        const idUser = req.params.id
        const nuevoPost = await Post.create({
            UserId: req.params.id,
            content: req.body.content
        })

        res.status(201).json(nuevoPost) //creado


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error interno' })
    }
}

const createCommentByUserId = async (req, res) => {
    try {
        const post = await Post.findByPk(req.body.PostId)
        if (!post) return res.status(404).json({ message: 'Post no encontrado' })
        const nuevoComentario = await Comment.create({
            UserId: req.params.id,
            PostId: req.body.PostId,
            content: req.body.content
        })
        return res.status(201).json(nuevoComentario)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error interno' })
    }
}


const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const modifiedUser = req.body
        const user = await User.findByPk(id)

        await user.update(modifiedUser)
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ message: 'Error interno' })

    }
}

// const updatePostByUserId = async(req, res) => {
//     try {


//     } catch (error) {
//         res.status(500).json({message: 'Error interno'})

//     }
// }

// const updateCommentByUserId = async(req, res) => {
//     try {


//     } catch (error) {
//         res.status(500).json({message: 'Error interno'})

//     }
// }


const deleteUser = async (req, res) => {
    try {
        //definir como hacer cuando tiene asociaciones

        const id = req.params.id
        const user = await User.findByPk(id)
        await user.destroy()
        res.status(200).json({ message: `Usuario con id: ${id} eliminado correctamente` })
    } catch (e) {
        res.status(500).json({ message: "Error interno" })
    }
}

module.exports = {
    getUser, getUserByPk, getPostsByUserId, getCommentsByUserId, createUser, createPostByUserId,
    createCommentByUserId, updateUser, deleteUser
}

// module.exports = { getUser, getUserByPk, getPostsByUserId, getCommentsByUserId, createUser, createPostByUserId,
//     createCommentByUserId, updateUser, updatePostByUserId, updateCommentByUserId, deleteUser }