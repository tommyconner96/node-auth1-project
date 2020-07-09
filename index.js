const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const db = require("./database/data")
// const usersRouter = require("./users/user-router")

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "super secret secret! shhh!",
    store: new KnexSessionStore({
        knex: db,
        createtable: true,
    }),
}))

// server.use(usersRouter)

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Oops! Something went wrong",
    })
})

server.listen(port, () => {
    console.log(`server running @ port ${port}`)
})
