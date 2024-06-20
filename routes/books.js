const express = require("express")
const router = express.Router()
const booksCtrl = require("../controllers/books")
const auth = require("../middleware/auth")

router.get("/", booksCtrl.getAllBooks)
router.get("/bestrating", booksCtrl.getBestRating)
router.get("/:id", booksCtrl.getOneBook)

module.exports = router
