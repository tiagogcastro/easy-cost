const dotenv = require("dotenv")
dotenv.config()

const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const db = require('./db')

module.exports = session ({
    store: new pgSession({
        pool: db
    }),
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false,
    saveUninitialized: false, // se tiver dados
    cookie: {
        // Time connected
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
})