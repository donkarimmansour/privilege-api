const mongoose = require("mongoose")

const LevelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }, 

    language: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "language"
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


const LevelsRquest = mongoose.model("level", LevelSchema)

module.exports =  LevelsRquest