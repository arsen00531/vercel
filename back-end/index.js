require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require("socket.io");
const io = new Server(server)
const path = require('path')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const db = require('./db/db')
const url = require('./db/url')
const PORT = process.env.PORT || 3000

app.set("view options", {layout: false});
app.set('views', path.join(__dirname, '../', 'front-end'));
app.use(express.static(path.join(__dirname, '../', 'front-end')));
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    try {
        const cookies = req.headers.cookie
        if (!cookies) return res.redirect(url + 'login')
        cookies.split(';').forEach(async (cookie) => {
            const decoded = jwt.decode(cookie.split('=')[1])
            if (decoded) {
                const row = (await db.query('SELECT * FROM chat')).rows
                res.render(path.join('pages', 'index.ejs'), {decoded, row})
            }
        })
    } catch (err) {
        console.log(err)
    }
})

app.get('/login', (req, res) => {
    res.render(path.join('pages', 'login.html'))
})

app.get('/reg', (req, res) => {
    res.render(path.join('pages', 'reg.html'))
})

app.get('/logout', (req, res) => {
    req.headers.cookie.split(';').forEach((cookie) => {
        const decoded = jwt.decode(cookie.split('=')[1])
        if (decoded) {
            res.clearCookie(cookie);
            res.redirect(url)
        }
    })
})

app.post('/reg', async (req, res) => {
    try {
        const name = req.body.name
        const password = req.body.password
        const row = (await db.query("SELECT id FROM users WHERE name = $1", [name])).rows

        if (row.length != 0) return res.redirect(url + 'reg')

        await db.query("INSERT INTO users (name, password) VALUES ($1, $2)", [name, password] )
        res.redirect(url + 'login')
    } catch(err) {
        console.error(err);
    }
})

app.post('/login', async (req, res) => {
    try {
        const name = req.body.name
        const password = req.body.password
        const user = (await db.query("SELECT * FROM users WHERE name = $1", [name])).rows
        
        if (user.length === 0) return res.redirect(url + 'login')
        if (user[0].password != password) return res.redirect(url + 'login')

        const token = jwt.sign(name, 'shhhh')
        res.cookie(user[0].id, token)
        res.redirect(url)
    } catch (err) {
        console.error(err);
    }
})

const connections = []

io.sockets.on('connection', (socket) => {
    console.log("Успешное соединение");
    connections.push(socket);

    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Отключились");
    });

    socket.on('send mess', async (data) => {
        await db.query("INSERT INTO chat (name, text, time) VALUES ($1, $2, $3)", [data.name, data.mess, data.time]);

        io.sockets.emit('add mess', {mess: data.mess, name: data.name, time: data.time});
    });
});

server.listen(PORT, () => console.log(PORT))