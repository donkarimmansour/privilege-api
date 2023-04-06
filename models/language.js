const mongoose = require("mongoose")

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
    },

    description: {
        type: String,
        trim: true,
    },
 
    registerFees: {
        type: Number,
        required: true,
        trim: true,
    },

    session: [{
        type: {
            ttype: { type: String, required: true },
            hours: { type: Number, required: true },
            price: { type: Number, required: true }
        },
        required: true,
    }],

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

const CoursesRquest = mongoose.model("language", CourseSchema)

module.exports =  CoursesRquest