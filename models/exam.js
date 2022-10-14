const mongoose = require("mongoose")

const ExamSchema = mongoose.Schema({

   
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