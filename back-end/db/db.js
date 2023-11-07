const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.local.PG_USER || process.env.USER,
    password: process.env.local.PG_PASSWORD || process.env.PASSWORD,
    host: process.env.local.PG_HOST || process.env.HOST,
    port: 5432,
    database: process.env.local.PG_DATABASE || process.env.DB
})

module.exports = pool