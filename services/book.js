const BooksRquest = require("../models/book")

// get All Books
const getAllBooks = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    return new Promise((resolve, reject) => {

        const newExpend = expend === "all" ? [{path: 'language', model: 'language'}, {path: 'level',model: 'level'}] : expend

        BooksRquest.find({}, (errFind, books) => {


            if (errFind) {
                reject(errFind)
            } else if (books.length <= 0) {
                reject("there are no Books")
            } else {


                resolve(books)

            }


        }).populate(newExpend)
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })


    })
}

// get All Books Count
const getAllBooksCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        BooksRquest.find({}, (errFind, books) => {

            if (errFind) {
                reject(errFind)
            } else if (books.length <= 0) {
                reject("there are no Books")
            } else {


                resolve(books)

            }


        }).count({ ...JSON.parse(filter) })

    })
}

// create Book
const createBook = (title, quantity, language, level, actions) => {

    return new Promise((resolve, reject) => { // check email 

                // inser a new Book
                BooksRquest.create({
                    title, quantity, language, level, actions: [actions]
                }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert) 
                        return
                    }


                    resolve(res._id)


                })

    })
}

// edit Book
const editBook = (id, title, quantity, language, level, actions) => {
    return new Promise((resolve, reject) => { // update Book
        // check id
        BooksRquest.findOne({}, (errFind, Book) => {

            if (errFind) {
                reject(errFind)
            } else if (!Book) {
                reject("id not exist")
            } else {


                BooksRquest.updateOne({}, {
                    title, quantity, language, level, $push: {actions} , updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate) {
                        reject(errUpdate)
                        return
                    }

                    if (doc.modifiedCount > 0) {
                        resolve("modified")


                    } else {
                        reject("something went wrong")

                    }

                }).where("_id").equals(id)

            }

        }).where("_id").equals(id)



    })
}



// delete Book
const deleteBook = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        BooksRquest.findOne({}, (errFind, book) => {

            if (errFind) {
                reject(errFind)
            } else if (!book) {
                reject("id not exist")
            } else {

                //delete
                BooksRquest.deleteOne({}
                    , (errUpdate, doc) => {
                        if (errUpdate) {
                            reject(errUpdate)
                            return
                        }

                        if (doc.deletedCount > 0) {
                            resolve("deleted")

                        } else {
                            reject("something went wrong")
                        }

                    }).where("_id").equals(id)
            }//else
        }).where("_id").equals(id)

    })
}


module.exports = { getAllBooks, getAllBooksCount, createBook, editBook, deleteBook  }
