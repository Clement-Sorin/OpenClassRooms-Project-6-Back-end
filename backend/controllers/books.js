const Book = require("../models/Book")

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
