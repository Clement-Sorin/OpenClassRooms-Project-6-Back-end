const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    )
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next()
})

app.use((req, res) => {
    res.json({ message: "test server port 3100" })
})

module.exports = app
