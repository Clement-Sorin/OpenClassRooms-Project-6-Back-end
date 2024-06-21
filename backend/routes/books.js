const express = require("express")
const router = express.Router()
const booksCtrl = require("../controllers/books")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")

router.post("/", auth, multer, booksCtrl.createBook)
router.get("/", booksCtrl.getAllBooks)
router.get("/bestrating", booksCtrl.getBestRating)
router.get("/:id", booksCtrl.getOneBook)
router.put("/:id", auth, multer, booksCtrl.modifyBook)

module.exports = router
