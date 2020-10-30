const db = require('../../config/db')
const { hash } = require('bcryptjs')

const Product = require('../models/Product')

module.exports = {
    async findOne(filters) {
        let query = `SELECT * FROM users`

        Object.keys(filters).map(key => {
            query = `${query}
            ${key}`
            
            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })

        const results = await db.query(query)
        return results.rows[0]
    },

    async create(data) {
        try {
            const query = `
            INSERT INTO users (
            name,
            email,
            password
            ) VALUES ($1, $2, $3)
            RETURNING id
            `
            const passwordHash = await hash(data.password, 8)
            const values = [
                data.name,
                data.email,
                passwordHash
            ]

            const results = await db.query(query, values)

            return results.rows[0].id
        } catch(err) {
            console.error(err)
        }
    },

    async update(id, fields) {
        try {
            let query = `UPDATE users SET`

            Object.keys(fields).map((key, index, array) => {
                if ((index + 1) < array.length) {
                    query = `${query}
                        ${key} = '${fields[key]}',
                    `
                } else {
                    query = `${query}
                    ${key} = '${fields[key]}'
                    WHERE id = ${id}`
                }
            })
            await db.query(query)

        }catch(err) {
            console.error(err)
        }
    },

    async delete(id) {
        try {
            let results = await db.query(`SELECT FROM products WHERE user_id = $1`, [id])
            const products = results.rows

            await db.query(`DELETE FROM users WHERE id = $1`, [id])

        } catch (err) {
            console.log(err)
        }
    }

}