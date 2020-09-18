const express = require('express')
const routes = express.Router()
const products = require("./app/controllers/products")

routes.get('/', function (req, res) {
    return res.redirect('/products')
})

routes.get('/products', products.index)
routes.get('/products/create', products.create)
routes.get('/products/:id', products.show)

routes.put('/products', products.put)
routes.delete('/products', products.delete)
routes.post('/products', products.post) 

module.exports = routes
