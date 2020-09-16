const { age, date, split } = require('../../lib/utils')
const Product = require('../models/Product')

module.exports = {
    async index(req, res) {
        let { filter } = req.query
        const products = await Product.findAll(req.params.id)

        return res.render('products/index', {filter, products})
    },

    create(req, res) {
        return res.render('products/create')
    },

    post(req, res) {

        // validação
        const keys = Object.keys(req.body) 
        
        for(key of keys) {
            req.body[key] // req.body.key == ""
            if (req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }

        Product.create(req.body, function(product) {
            return res.redirect(`products`)
        })
    },

    show(req, res) {
       Product.find(req.params.id, function(product) {
           if (!product) {
               return res.send('Product not found!')
           }
           product.created_at = date(product.created_at).format

           return res.render('products/show', { product })
       })
    },

//     edit(req, res) {
//         Product.find(req.params.id, function(product) {
//             if (!product) {
//                 return res.send('Product not found!')
//             }
 
//             product.birth = date(product.birth).iso
 
//             return res.render('products/edit', { product })
//         })
//     },
    
//     put(req, res) {
//        // validação
//         const keys = Object.keys(req.body) 
        
//         for(key of keys) {
//            req.body[key] // req.body.key == ""
//            if (req.body[key] == "") {
//                return res.send('Please, fill all fields')
//            }
//        }

//        Product.update(req.body, function() {
//            return res.redirect(`/products/${req.body.id}`)
//        })
//     },

//     delete(req, res) {
//         Product.delete(req.body.id, function() {
//             return res.redirect(`/products`)
//         })
//     }
}