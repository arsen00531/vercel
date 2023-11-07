const Pool = require('pg').Pool

const pool = new Pool({
    connectionString: process.env.PG_URL + "?sslmode=require",
})

module.exports = pool