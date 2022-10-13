const mongoose = require("mongoose")

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        required: true,
        trim: true,
    },
    language: {
        type: String,
        required: true,
        trim: true,
    },
    level: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref : "level"
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },

   
})



const BooksRquest = mongoose.model("book", BookSchema)

module.exports =  BooksRquest