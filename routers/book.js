const BookControlles = require("../controlles/book")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { BookValidator } = require("../middlewares/validators")

// getall Books
router.get(ApiEndpoints.Library.list , passport.authenticate("admin", {session: false}) ,  BookControlles.getAllBooks ,  handleError)

// count Books
router.get(ApiEndpoints.Library.count , passport.authenticate("admin", {session: false}) ,  BookControlles.getAllBooksCount , handleError)

// create Book
router.post(ApiEndpoints.Library.create,passport.authenticate("admin", {session: false})  ,  BookValidator, HandleValidatorError , BookControlles.createBook , handleError)

// edit Book
router.put(ApiEndpoints.Library.edit , passport.authenticate("admin", {session: false}) , BookValidator , idValidator, HandleValidatorError , BookControlles.editBook , handleError)

// delete Book
router.delete(ApiEndpoints.Library.delete , passport.authenticate("admin", {session: false}), idValidator , BookControlles.deleteBook , handleError)


module.exports = router