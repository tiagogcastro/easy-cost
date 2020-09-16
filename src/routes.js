const express = require('express')
const routes = express.Router() // criando a rota dos metodos get
const products = require("./app/controllers/products")
const members = require('./app/controllers/members')

routes.get('/', function (req, res) {
    return res.redirect('/products')
})

routes.get('/products', products.index)

routes.get('/products/create', products.create)

// ve o id
routes.get('/products/:id', products.show)

// // para ir na page de editar
// routes.get('/products/:id/edit', products.edit)

// // para editar
// routes.put('/products', products.put)

// routes.delete('/products', products.delete)

routes.post('/products', products.post) 


routes.get('/members', members.index)

routes.get('/members/create', members.create)

routes.get('/members/:id/', members.show)

routes.get('/members/:id/edit', members.edit)

routes.put('/members', members.put)

routes.delete('/members', members.delete)

routes.post('/members', members.post)

module.exports = routes


// get: Receber RESOURCE
// Post: Criar um novo RESOURCER com dados enviados
// put: Atualizar RESOURCE
// delete: Deletar RESOURCE