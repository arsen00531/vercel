const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.PG_USER || process.env.USER,
    password: process.env.PG_PASSWORD || process.env.PASSWORD,
    host: process.env.PG_HOST || process.env.HOST,
    port: 5432,
    database: process.env.PG_DATABASE || process.env.DB
})

module.exports = pool