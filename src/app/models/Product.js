const { date } = require('../../lib/utils')

const db = require('../../config/db')

module.exports = {
    // Busca todos os cadastros no banco e retorna na pagina
    all(callback) {
        db.query(`
        SELECT products.*
        FROM products
        GROUP BY (products.id)
        ORDER BY updated_at DESC`, 
        function(err, results) {
            if(err) {
                throw `Database Error! ${err}`
            }
            
            callback(results.rows)
        })
    },

    create(data, callback) {

        const query = `
            INSERT INTO products (
                name,
                brand,
                provider,
                quantity,
                total_value,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        data.total_value = data.total_value.replace(/\D/g,"")
        const values = [
            data.name,
            data.brand,
            data.provider,
            data.quantity,
            data.total_value,
            date(Date.now()).iso,          
        ]

        db.query(query, values, (err, results) => {
            if(err) {
                throw `Database Error! ${err}`
            }
            callback(results.rows[0])
        })
    },

    findAll: async() => {
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT * FROM products
                GROUP BY (products.id)
                ORDER BY created_at DESC
            `, [], function(err, results) {
            if(err) {
              reject(`Database Error! ${err}`)
            }
                resolve(results.rows)
            })
        })
      },

    find(id, callback) {
        db.query(`SELECT * FROM products WHERE id = $1`, [id], function(err, results) {
            if(err) {
                throw `Database Error! ${err}`
            }

            callback(results.rows[0])
        })
    },

    findBy(filter, callback) {
        db.query(`
        SELECT products.*
        FROM products
        WHERE products.name ILIKE '%${filter}%'
        OR products.total_values ILIKE '%${filter}%'
        GROUP BY (products.id)
        ORDER BY products.name DESC`, 
        function(err, results) {
            if(err) {
                throw `Database Error! ${err}`
            }
            
            callback(results.rows)
        })
    },

    update(data, callback) {
        const query = `
            UPDATE products SET
                name=($1),
                brand=($2),
                provider=($3),
                quantity=($4),
                total_value=($5)
            WHERE id = $6
        `

        const values = [
            data.name,
            data.brand,
            data.provider,
            data.quantity,
            data.total_value,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) {
                throw `Database Error! ${err}`
            }

            callback()
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM products WHERE id = $1`, [id], 
        function(err, results) {
            if(err) {
                throw `Database Error! ${err}`
            }
            return callback()
        })
    },
    
    // paginate(params) {
    //     const { filter, limit, offset, callback} = params

    //     let query = "",
    //         filterQuery = "",
    //         totalQuery = `(
    //             SELECT count(*) FROM products
    //             ) AS total`

    //     if (filter) {
    //         filterQuery = `
    //         WHERE products.name ILIKE '%${filter}%'
    //         OR products.services ILIKE '%${filter}%'`

    //         totalQuery = `(
    //             SELECT count(*) FROM products
    //             ${filterQuery}
    //         ) as total`
    //     }

    //     // Vai limitar a paginação
    //     query = `
    //     SELECT products.*, ${totalQuery} , count(members) AS total_students 
    //     FROM products
    //     LEFT JOIN members ON (products.id = members.instructor_id)
    //     ${filterQuery}
    //     GROUP BY products.id LIMIT $1 OFFSET $2`

    //     db.query(query, [limit, offset], function(err, results) {
    //         if(err) {
    //             throw 'Database Error!'
    //         }

    //         callback(results.rows)
    //     })

    // }

 }