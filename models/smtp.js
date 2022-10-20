const mongoose = require("mongoose")

const SmtpSchema = mongoose.Schema({
    host: {
        type: String, 
        required: true,
        trim: true, 
    },
    username: { 
        type: String,
        required: true,
        trim: true,
    },
    port: {
        type: Number,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    security: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
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

const SmtpRquest = mongoose.model("smtp", SmtpSchema)

module.exports =  SmtpRquest