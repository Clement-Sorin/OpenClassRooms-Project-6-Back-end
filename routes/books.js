const express = require("express")
const router = express.Router()
const booksCtrl = require("../controllers/books")
const auth = require("../middleware/auth")

router.get("/", booksCtrl.getAllBooks)
router.get("/:id", booksCtrl.getOneBook)
router.get("/bestrating", booksCtrl.getBestRating)

module.exports = router
