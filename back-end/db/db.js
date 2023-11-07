const Pool = require('pg').Pool

const pool = new Pool({
    connectionString: "postgres://arsen00531:qgk5ilD8CB812OUwyNEvM10zIHRQs2N8@dpg-cl598ok72pts739ut3ag-a/chat_hw0r",
})

module.exports = pool