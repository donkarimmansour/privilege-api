const BookControlles = require("../controlles/book")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { BookValidator } = require("../middlewares/validators")

// getall Books
router.get(ApiEndpoints.Library.list , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  BookControlles.getAllBooks ,  handleError)

// count Books
router.get(ApiEndpoints.Library.count , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  BookControlles.getAllBooksCount , handleError)

// create Book
router.post(ApiEndpoints.Library.create,passport.authenticate("adminOrsuperAdmin", {session: false})  ,  BookValidator, HandleValidatorError , BookControlles.createBook , handleError)

// edit Book
router.put(ApiEndpoints.Library.edit , passport.authenticate("adminOrsuperAdmin", {session: false}) , BookValidator , idValidator, HandleValidatorError , BookControlles.editBook , handleError)

// delete Book
router.delete(ApiEndpoints.Library.delete , passport.authenticate("superAdmin", {session: false}), idValidator , BookControlles.deleteBook , handleError)


module.exports = router