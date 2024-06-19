require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bookRouter = require("./routes/books")

const app = express()

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => console.log("Connection to MongoDB completed"))
    .catch(() => console.log("Connection to MongoDB failed"))

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    )
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next()
})

app.use("/api/books", bookRouter)

module.exports = app
