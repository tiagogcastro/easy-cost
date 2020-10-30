const User = require('../models/User')
const { hash } = require('bcryptjs')
const crypto = require('crypto')

module.exports = {
    async loginForm(req, res) {
        return res.render('session/login')
    },

    async login(req, res) {
        req.session.userId = req.user.id
        return res.redirect('/users')
    },

    async logout(req, res) {
        req.session.destroy()
        return res.redirect('/')
    }
}