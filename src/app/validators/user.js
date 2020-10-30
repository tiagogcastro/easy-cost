const User = require('../models/User')
const { compare } = require('bcryptjs')

function checkAllFields(body) {
    // chek if has all fields
    const keys = Object.keys(body) 

    for(key of keys) {
        if (body[key] == "") {
            return {
                user: body,
                error: 'Por favor, preencha todos os campos! '
            }
        }
    }
}

async function show(req, res, next) {
    const { userId: id} = req.session

    const user = await User.findOne( {where: {id}} )

    if (!user) return res.render('user/register', {
        error: "Usuário não encontrado!"
    })

    req.user = user
    next()
}

async function post(req, res, next) {
    const fillAllFields = checkAllFields(req.body)

    if(fillAllFields) {
        return res.render('user/register', fillAllFields)
    }

    // check if user exists [email, cpf_cnpj UNIQUE]
    let { email, cpf_cnpj, password, passwordRepeat} = req.body
    
    // cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await User.findOne({ 
        where: { email }
    })

    if (user) {
        return res.render('user/register', {
            user: req.body,
            error: 'Usuário já cadastrado!'
        })
    }

    // check if password match
    if (password != passwordRepeat) {
        return res.render('user/register', {
            user: req.body,
            error: 'As senhas não são iguais!'
        })
    }

    next()
}

async function update(req, res, next) {
    const { id, password, email, cpf_cnpj, cep} = req.body
    try {      
        // all fields
        const fillAllFields = checkAllFields(req.body)

        if(fillAllFields) {
            return res.render('user/index', fillAllFields)
        }

        // has password
        if (!password) return res.render('user/index', {
            user: req.body,
            error: "Coloque sua senha para atualizar seu cadastro."
        })
        
        // password match
        const user = await User.findOne({where: {id}})
        const passed = await compare(password, user.password)

        if(!passed) return res.render('user/index', {
            user: req.body,
            error: "Senha incorreta."
        })

        req.user = user

        next()
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    post,
    show,
    update,
}