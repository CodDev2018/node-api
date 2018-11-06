var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var passportJWT = require('passport-jwt')
var JWTStrategy = passportJWT.Strategy
var ExtractJwt = passportJWT.ExtractJwt
var User = require('../model/user')

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    async function (username, password, cb) {
        try {
            var user = await User.findOne({ username, password }).exec()
            if (!user) {
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