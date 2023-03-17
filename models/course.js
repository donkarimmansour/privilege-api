const mongoose = require("mongoose")

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
    },

    description: {
        type: String,
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "file",
        default : "64138ac71da720d3bad08485"
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

const CoursesRquest = mongoose.model("course", CourseSchema)

module.exports =  CoursesRquest