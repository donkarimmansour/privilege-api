const mongoose = require("mongoose")

const ExamSchema = mongoose.Schema({

    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref : "student",
    },

    exam: {
        type: Array,
        required: true,
        trim: true,
    },

    rate: {
        type: Number,
        required: true,
    } ,

    quizzes: {
        type: Number,
        required: true,
    } ,

    successed: {
        type: Number,
        required: true,
    } ,


    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },

   
})

const ExamsRquest = mongoose.model("exam", ExamSchema)

module.exports =  ExamsRquest