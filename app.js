require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const Book = require("./models/Book")

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

app.get("/api/books", async (req, res, next) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(400).json({ error })
    }
})

app.get("/api/books/:id", async (req, res, next) => {
    try {
        const book = await Book.findOne({ _id: req.params.id })
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({ error })
    }
})

module.exports = app
