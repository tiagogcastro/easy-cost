const dotenv = require ("dotenv") 
dotenv.config ()

const { Pool } = require('pg')

module.exports = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE
})

console.log(process.env.MESSAGE_INITIAL)