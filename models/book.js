const mongoose = require("mongoose")

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    }, 

    quantity: {
        type: Number,
        required: true,
        trim: true,
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "language"
    },
    level: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "level"
    }, 

    actions: [{
        type: {
            fullName: { type: String, required: true },
            role: { type: String, required: true },
            action: { type: String, required: true },
            date: { type: Date, required: true, default: Date.now() },
        },
        required: true,
    }],

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