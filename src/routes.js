var UserController = require('./controller/UserController')
var PostController = require('./controller/PostController')
var passport = require('./auth/passport')

module.exports = function (app) {

    var jwtMid = passport.authenticate('jwt', { session: false })
    var findPostMid = PostController.findPostMiddleware
    var findUserMid = UserController.findUserMiddleware
    //USER
    app.post('/login', UserController.login);
    app.get('/users', UserController.index)
    app.post('/user', UserController.save)
    app.get('/user/:userId', findUserMid, UserController.get)
    app.put('/user/:userId', jwtMid, findUserMid, UserController.update)
    app.delete('/user/:userId', jwtMid, UserController.delete)

    //POST
    app.get('/user/:userId/posts', PostController.index)
    app.post('/user/:userId/post', jwtMid, PostController.save)
    app.get('/user/:userId/post/:id', findPostMid, PostController.get)
    app.put('/user/:userId/post/:id', jwtMid, findPostMid, PostController.update)
    app.delete('/user/:userId/post/:id', jwtMid, findPostMid, PostController.delete)
}