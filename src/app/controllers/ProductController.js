const { get } = require('browser-sync')
const { formatPrice, date} = require('../../lib/utils')
const Product = require('../models/Product')
const Category = require('../models/Category')

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

    async create(_req, res) {
        try{
            results = await Category.all()
            let categories = results.rows
            return res.render('products/create', { categories })
        } catch(err) {
            return res.render('products/create', {
                categories,
                error: "Houve um erro inesperado ou não foi possível carregar as categorias."
            })
        }
    },

    async post(req, res) {
        try {
            const keys = Object.keys(req.body) 
            for(key of keys) {
                const values = req.body[key] 
                if (values == "") {
                    return res.render('products/create', {
                        products: req.body,
                        error: `Por favor, preencha todos os campos para cadastrar esse produto.`
                    })
                }
            }
            Product.create(req.body, function(product) {
                return res.redirect(`products`)
            })
        } catch (err) {
            return res.render('products/create', {
                products: req.body,
                error: `Algum erro aconteceu no banco de dados ao criar seu produto! Por favor tente novamente.`
            })
        }
    },

    show(req, res) {
        try {
            Product.find(req.params.id, async function(product) {
                if (!product) {
                    return res.send('Product not found!')
                }
                const { day, hour, minutes, month} = date(product.updated_at)
     
                product.published = {
                    day: `${day}/${month}`,
                    hour: `${hour}h ${minutes}min`
                }

                product.updated_at = date(product.updated_at).format
                results = formatPrice( product.total_value / product.quantity )
                const total = product.total_value = formatPrice(product.total_value)

                resultsCategory = await Category.all()
                const categories = resultsCategory.rows
        
                return res.render('products/show', { 
                 product, total, results, categories
                })
            })
        } catch(err) {
            console.log(err)
            return res.render('products/index', {
                error: "Não foi possível acessar essa página, tente novamente."
            })
        }     
    },

    async put(req, res) {
        const {id } = req.body
        
        try {    
            const keys = Object.keys(req.body) 
            for(key of keys) {
                req.body[key] 
                if (req.body[key] == "") {
                    return (
                        returningUpdateToRedirect()
                    )
                } else {
                    return returningUpdateToRedirect()
                }
            }
        } catch(err) {
            console.error(err)
            return res.render(`/products/${id}`, {
                product: req.body,
                error: "Algum erro aconteceu. Tente novamente!"
            })
        }
        async function returningUpdateToRedirect() {
            req.body.total_value = req.body.total_value.replace(/\D/g, "")     
            let products = await Product.findAll(req.params.id)
            products = products.map(product => {
                const { hour, minutes, day, month, year} = date(product.updated_at)
                return {
                    ...product,
                    results: formatPrice( product.total_value / product.quantity ),
                    updated_at: product.updated_at = date(product.updated_at).format,
                    published: `${hour}h ${minutes}min`,
                    total_value: product.total_value = formatPrice(product.total_value)
                }
            })  

            await Product.update(req.body, async () => {           
                return res.redirect('/products')
            })  
        }
    },

    async delete(req, res) {
        const {id } = req.body
        try {
            await Product.delete(req.body.id, async function() {
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
                return res.render(`products/index`, {
                    products,
                    success: `Produto Deletado com sucesso!`
                })
            })
        } catch(err) {
            console.error(err)
            return res.render(`products/${id}`, {
                user: req.body,
                error: "Erro ao tentar deletar o produto. Tente novamente."
            })
        }
    }
}