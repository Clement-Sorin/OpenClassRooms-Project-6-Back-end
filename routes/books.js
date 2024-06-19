const express = require("express")
const router = express.Router()

const Book = require("../models/Book")

router.get("/", async (req, res, next) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const book = await Book.findOne({ _id: req.params.id })
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.get("/bestrating", async (req, res, next) => {
    try {
        const books = await Book.find()
        const topBooks = books
            .sort((a, b) => b.averageRating - a.averageRating)
            .slice(0, 3)
        res.status(200).json(topBooks)
    } catch (error) {
        res.status(400).json({ error })
    }
})

module.exports = router
