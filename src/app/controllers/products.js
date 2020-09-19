const { formatPrice, date} = require('../../lib/utils')
const Product = require('../models/Product')

module.exports = {
    async index(req, res) {
        let { filter } = req.query
        let products = await Product.findAll(req.params.id)

        products = products.map(product => {
            const { hour, minutes} = date(product.updated_at)
            return {
                ...product,
                results: formatPrice( product.total_value / product.quantity ),
                updated_at: product.updated_at = date(product.updated_at).format,
                published: `${hour}h ${minutes}min`,
                total_value: product.total_value = formatPrice(product.total_value)
            }
        })
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
           const { day, hour, minutes, month} = date(product.updated_at)

           product.published = {
               day: `${day}/${month}`,
               hour: `${hour}h ${minutes}min`
           }
   
           const price = product.total_value
           const total = product.total_value = formatPrice(product.total_value)
           product.updated_at = date(product.updated_at).format
   
           return res.render('products/show', { product, total, price })
        })
    },

    put(req, res) {
       // validação
       const keys = Object.keys(req.body) 
        
       for(key of keys) {
           req.body[key] 
           if (req.body[key] == "") {
               return res.send('Please, fill all fields')
           }
       }
       req.body.total_value = req.body.total_value.replace(/\D/g, "")
       Product.update(req.body,function(product) {

            return res.redirect(`/products/${req.body.id}`)
        })    
    },

    async delete(req, res) {
        await Product.delete(req.body.id, function() {
            return res.redirect(`/products`)
        })
    }
}