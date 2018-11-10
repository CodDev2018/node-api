var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var passportJWT = require('passport-jwt')
var JWTStrategy = passportJWT.Strategy
var ExtractJwt = passportJWT.ExtractJwt
var User = require('../model/user')
var sha256 = require('crypto-js/sha256')

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    async function (username, password, cb) {
        try {
            password = sha256(password).toString()
            var user = await User.findOne({ username }).exec()
            if (!user || password !== user.password) {
                return cb(null, false, { message: 'Nome de usuário ou senha incorreta.' })
            }
            return cb(null, user._id.toString(), { message: 'Atenticado com sucesso!' })
        }
        catch (err) {
            return cb(err)
        }
    }
))


passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: 'your_jwt_secret'
    },
    async (jwt_payload, done) => {
        try {
            var user = await User.findById(jwt_payload.id)
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (err) {
            return done(err, false)
        }
    }
))

module.exports = passport