const db = require('../../config/db')

module.exports = {
    async all() {
        return (
            db.query(`SELECT * FROM categories`)
        )
    }
}