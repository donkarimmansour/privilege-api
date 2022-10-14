const mongoose = require("mongoose")

const LevelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref : "group"
    }, 
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref : "department"
    }, 
    position: { 
        type: Number,
        required: true,
        trim: true,
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


const LevelsRquest = mongoose.model("level", LevelSchema)

module.exports =  LevelsRquest