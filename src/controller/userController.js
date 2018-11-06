var User = require('../model/user')
var passport = require('../auth/passport')
var jwt = require('jsonwebtoken');

class UserController {

    async index(req, res) {
        try {
            var users = await User.find().exec()
            res.json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async save(req, res) {
        var user = await new User({
            username: req.body.username,
            password: req.body.password
        }).save()

        res.json(user)
    }

    async get(req, res) {
        return res.json(req.user)
    }

    async update(req, res) {
        req.user.username = req.body.username
        req.user.password = req.body.password

        req.user = await req.user.save()

        return res.json(req.user)
    }

    async delete(req, res) {
        await User.findByIdAndRemove(req.params.userId)
        return res.status(204).json({})
    }

    async findUserMiddleware(req, res, next) {
        var user = await User.findOne({ _id: req.params.userId }).exec()
        if (!user) {
            return res.status(404).json({ 'message': 'Usuário não encontrado' })
        }
        req.user = user
        next()
    }

    async login(req, res, next) {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Alguma coisa está errada!',
                    user: user
                });
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }
                const token = jwt.sign({ id: user }, 'your_jwt_secret');
                return res.json({ user, token });
            });
        })(req, res);
    }

}

exports = module.exports = new UserController()