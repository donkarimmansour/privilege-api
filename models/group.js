const mongoose = require("mongoose")

const GroupSchema = mongoose.Schema({
    name: {
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



const GroupsRquest = mongoose.model("group", GroupSchema)

module.exports =  GroupsRquest