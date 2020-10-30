const express = require('express')
const routes = express.Router()
const ProductController = require("../app/controllers/ProductController")
const { isLoggedRedirectToUsers, onlyUsers } = require('../app/middlewares/session')

routes.get('/', onlyUsers, ProductController.index)
routes.get('/create',onlyUsers, ProductController.create)
routes.get('/:id',onlyUsers, ProductController.show)

routes.put('/',onlyUsers, ProductController.put)
routes.delete('/',onlyUsers, ProductController.delete)
routes.post('/',onlyUsers, ProductController.post) 

module.exports = routes
