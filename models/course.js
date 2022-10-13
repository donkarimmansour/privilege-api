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
        required: false,
        trim: true,
        ref : "file",
        default : "6345c36928d91b2909c053e7"
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