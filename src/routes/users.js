const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')

const UserValidator = require('../app/validators/user')
const SessionValidor = require('../app/validators/session')

const { isLoggedRedirectToUsers, onlyUsers} = require('../app/middlewares/session')

// // Login/logout 
routes.get('/login', isLoggedRedirectToUsers, SessionController.loginForm)
routes.post('/login', SessionValidor.login, SessionController.login)
routes.post('/logout', SessionController.logout)

// // Reset password/ forgot
// routes.get('/forgot-password', SessionController.forgotForm)
// routes.get('/password-reset', SessionController.resetForm)

// routes.post('/forgot-password', SessionValidor.forgot, SessionController.forgot)
// routes.post('/password-reset', SessionValidor.reset, SessionController.reset)

// // user register - UserController
routes.get('/register', UserController.registerForm)
routes.post('/register', UserValidator.post, UserController.post)

routes.get('/', onlyUsers, UserValidator.show, UserController.show)
routes.put('/', UserValidator.update, UserController.update)
routes.delete('/', UserController.delete)

module.exports = routes
