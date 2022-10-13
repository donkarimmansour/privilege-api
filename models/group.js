const mongoose = require("mongoose")

const GroupSchema = mongoose.Schema({
    title: {
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



const GroupsRquest = mongoose.model("group", GroupSchema)

module.exports =  GroupsRquest