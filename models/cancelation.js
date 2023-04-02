const mongoose = require("mongoose")

const CancelationSchema = mongoose.Schema({
   
    name: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    day: {
        type: String,
        required: true,
        trim: true,
    },
    
    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref : "group"
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

const CancelationsRquest = mongoose.model("cancelation", CancelationSchema)

module.exports =  CancelationsRquest