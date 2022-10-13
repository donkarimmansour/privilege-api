const BookModel = require("../services/book")
const codes = require("../common/codes")


// get All Books
const getAllBooks = (req, res) => {
    const { sort, limit, skip, filter, select, expend } = req.query;

    BookModel.getAllBooks(sort, limit, skip, filter, select, expend).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}
 
// get All Books Count
const getAllBooksCount = (req, res) => {
    const { filter } = req.query;

    BookModel.getAllBooksCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// create Book
const createBook = (req, res) => {
    const { title, status, language, level } = req.body;

    BookModel.createBook( title, status, language, level).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Books
const editBook = (req, res) => {
    const {  title, status, language, level} = req.body;
    const { id } = req.params;

    BookModel.editBook(id,  title, status, language, level).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// delete Book
const deleteBook = (req, res) => {
    const { id } = req.params;

    BookModel.deleteBook(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllBooks, getAllBooksCount, createBook, editBook, deleteBook }
