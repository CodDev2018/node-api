var UserController = require('./controller/UserController')
var PostController = require('./controller/PostController')

module.exports = function (app) {
    
    //USER
    app.post('/login', UserController.login);
    app.get('/users', UserController.index)
    app.post('/user', UserController.save)
    app.get('/user/:userId', UserController.findUserMiddleware, UserController.get)
    app.put('/user/:userId', UserController.findUserMiddleware, UserController.update)
    app.delete('/user/:userId', UserController.delete)

    //POST
    app.get('/user/:userId/posts', PostController.index)
    app.post('/user/:userId/post', PostController.save)
    app.get('/user/:userId/post/:id', PostController.findPostMiddleware, PostController.get)
    app.put('/user/:userId/post/:id', PostController.findPostMiddleware, PostController.update)
    app.delete('/user/:userId/post/:id', PostController.findPostMiddleware, PostController.delete)
}