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
        ref : "level"
    }, 
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "department"
    }, 
    language: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "language"
    },

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "teacher"
    },
    
    session: {
        type: String,
        required: true,
        trim: true,
    },

    option: {
        type: String,
        required: true,
        trim: true,
    },

    calindar: {
        type: Object,
        required: true,
        trim: true,
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



const GroupsRquest = mongoose.model("group", GroupSchema)

module.exports =  GroupsRquest