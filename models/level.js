const mongoose = require("mongoose")

const LevelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }, 
    className: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref : "course"
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