const User = require('../models/User')

module.exports = {
    async registerForm(req, res) {
        return res.render('user/register')
    },

    async show(req, res) {
        try {
            const { user } = req
            return res.render('user/index', {user})
        } catch(err) {
            console.error(err)
            return res.render('products/index', {
                error: "Não foi possível acessar está página. Redirecionando para a página inicial."
            })
        }
    },

    async post(req, res) {
        try {
            const userId = await User.create(req.body)
            req.session.userId = userId
            return res.redirect('/users')
        } catch(err) {
            console.log(err)
            return res.render('user/register', {
                user: req.body,
                error: "Algum erro aconteceu. Por favor, tente novamente."
            })
        }
    },

    async update(req, res) {
        try {
            const { user } = req
            let { name, email} = req.body

            await User.update(user.id, {
                name,
                email
            })

            return res.render('user/index', {
                user: req.body,
                success: "Sucesso! Conta atualizada."
            })
        } catch (err) {
            console.log(err)
            return res.render('user/index', {
                user: req.body,
                error: "Não foi possível atualizar sua conta. Por favor, tente novamente."
            })
        }
    },
    
    async delete(req, res) {
        try {
            await User.delete(req.body.id)
            req.session.destroy()
            return res.render('session/login', {
                success: "Conta deletada com sucesso! Espero que um dia você possa voltar aqui."
            })
        }
        catch (err) {
            console.log(err)
            return res.render('user/index', {
                user: req.body,
                error: "Não foi possível deletar sua conta. Por favor, tente novamente."
            })  
        }
    },
}