var User = require('../model/user')
var Post = require('../model/post')

class PostController {
    async index (req, res) {
        var posts = await Post.find({ user: req.params.userId }).populate('user').exec()
        res.json(posts)
    }
    
    async save (req, res) {
        var user = await User.findOne({ _id: req.params.userId }).exec()
        if (!user) {
            return res.status(404).json({ 'message': 'Usuário não encontrado' })
        }
        var post = await new Post({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            user: user
        }).save()
    
        res.json(post)
    }
    
    async get (req, res) {
        return res.json(req.post)
    }
    
    async update (req, res) {
        req.post.titulo = req.body.titulo
        req.post.conteudo = req.body.conteudo
    
        req.post = await req.post.save()
    
        return res.json(req.post)
    }
    
    async delete (req, res) {
        await Post.findByIdAndRemove(req.params.id)
        return res.status(204).json({})
    }

    async findPostMiddleware(req, res, next) {
        var post = await Post.findOne({
            _id: req.params.id,
            user: req.params.userId
        }).populate('user').exec()
        if (!post) {
            return res.status(404).json({ 'message': 'Post não encontrado' })
        }
        req.post = post
        next(null)
    }
}

exports = module.exports = new PostController()