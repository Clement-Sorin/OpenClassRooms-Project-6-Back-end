const fs = require("fs").promises
const { userInfo } = require("os")
const Book = require("../models/Book")

exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(400).json({ error })
    }
}

exports.getOneBook = async (req, res, next) => {
    try {
        const book = await Book.findOne({ _id: req.params.id })
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({ error })
    }
}

exports.getBestRating = async (req, res, next) => {
    try {
        const books = await Book.find()
        const topRated = books
            .sort((a, b) => {
                return b.averageRating - a.averageRating
            })
            .slice(0, 3)
        res.status(200).json(topRated)
    } catch (error) {
        res.status(404).json({ error })
    }
}

exports.createBook = async (req, res, next) => {
    try {
        const bookObject = JSON.parse(req.body.book)
        delete bookObject._id
        delete bookObject._userId
        const book = new Book({
            ...bookObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
            }`,
            ratings: [],
            averageRating: 0,
        })
        await book.save()
        res.status(201).json({ message: "Objet enregistré !" })
    } catch (error) {
        res.status(400).json({ error })
    }
}

exports.modifyBook = async (req, res, next) => {
    try {
        let bookObject
        if (req.file) {
            bookObject = {
                ...JSON.parse(req.body.book),
                imageUrl: `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                }`,
            }
        } else {
            bookObject = { ...req.body }
        }

        delete bookObject._userId
        const book = await Book.findOne({ _id: req.params.id })
        if (!book) {
            return res.status(404).json({ message: "book not found" })
        }
        if (book.userId != req.auth.userId) {
            return res.status(401).json({ message: "not authorized" })
        }

        await Book.updateOne(
            { _id: req.params.id },
            { ...bookObject, _id: req.params.id }
        )
        res.status(200).json({ message: "book modified" })
    } catch (error) {
        res.status(400).json({ error })
    }
}

exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findOne({ _id: req.params.id })
        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }
        if (book.userId != req.auth.userId) {
            return res.status(401).json({ message: "not authorized" })
        }
        try {
            const filename = book.imageUrl.split("/images/")[1]
            await fs.unlink(`images/${filename}`)
            await Book.deleteOne({ _id: req.params.id })
            res.status(200).json({ message: "book deleted" })
        } catch (error) {
            res.status(400).json({ message: "error in book deletion" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
}

exports.addRating = async (req, res) => {
    try {
        const requestUserId = req.body.userId
        const newRating = {
            userId: requestUserId,
            grade: req.body.rating,
        }
        const book = await Book.findOne({ _id: req.params.id })
        const bookRates = book.ratings
        const dbRatingUserIds = bookRates.map((id) => id.userId)
        const userIdFilter = dbRatingUserIds.filter(
            (dbUserId) => dbUserId === "1"
        )
        if (userIdFilter < 1) {
            book.ratings.push(newRating)
            await book.save()
            return res
                .status(200)
                .json({ message: "new rating add successfully" })
        } else {
            res.status(400).json({
                message: "user can't post a rating more than once",
            })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}
