const fs = require("fs").promises
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

        try {
            const filename = book.imageUrl.split("/images/")[1]
            await fs.unlink(`images/${filename}`)
            await Book.updateOne(
                { _id: req.params.id },
                { ...bookObject, _id: req.params.id }
            )
            res.status(200).json({ message: "book modified" })
        } catch (error) {
            res.status(400).json({ error })
        }
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
        const requestRating = req.body.rating
        const newRating = {
            userId: requestUserId,
            grade: requestRating,
        }

        const book = await Book.findById(req.params.id)
        const userIdExists = book.ratings.some(
            (rating) => rating.userId === requestUserId
        )

        if (
            requestUserId === book.userId ||
            (userIdExists && requestRating >= 0 && requestRating <= 5)
        ) {
            // Erreur non gérer dans le frontend :
            // res.status(400).json({ message: "Vous n'avez pas le droit" })
            // Pour éviter un crash du serveur je retourne une réponse 200 avec le book
            return res.status(200).json(book)
        }

        //add new rating
        book.ratings.push(newRating)

        // change averageRating value
        const tableRating = book.ratings.map((rating) => rating.grade)
        book.averageRating =
            tableRating.reduce((a, b) => a + b, 0) / tableRating.length
        await book.save()

        return res.status(200).json(book)
    } catch (error) {
        console.log("Je suis un gamer")
        res.status(400).json({ error })
    }
}
