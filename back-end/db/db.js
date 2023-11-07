const Pool = require('pg').Pool

const pool = new Pool({
    host: "dpg-cl598ok72pts739ut3ag-a",
    port: 5432,
    database: "chat_hw0r",
    user: "arsen00531",
    password: "qgk5ilD8CB812OUwyNEvM10zIHRQs2N8"
})

module.exports = pool