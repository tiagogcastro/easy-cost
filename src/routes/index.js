const express = require('express')
const routes = express.Router()
const HomeController = require('../app/controllers/HomeController')
const ProductController = require('../app/controllers/ProductController')

const products = require('./products')
const users = require('./users')

const { onlyUsers } = require('../app/middlewares/session')

routes.get('/', HomeController.index)
routes.use('/products', products)
routes.use('/users', users)

// Alias
routes.get('/accounts', function(req, res) {
    return res.redirect('/users/login')
})

routes.get('/home', HomeController.index)



module.exports = routes