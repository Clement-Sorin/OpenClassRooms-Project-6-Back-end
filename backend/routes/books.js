const express = require("express")
const router = express.Router()
const booksCtrl = require("../controllers/books")
const auth = require("../middleware/auth")
const { upload, processImage } = require("../middleware/multer-config")

router.post("/", auth, upload, processImage, booksCtrl.createBook)
router.get("/", booksCtrl.getAllBooks)
router.get("/bestrating", booksCtrl.getBestRating)
router.get("/:id", booksCtrl.getOneBook)
router.put("/:id", auth, upload, processImage, booksCtrl.modifyBook)
router.delete("/:id", auth, booksCtrl.deleteBook)
router.post("/:id/rating", auth, booksCtrl.addRating)

module.exports = router
