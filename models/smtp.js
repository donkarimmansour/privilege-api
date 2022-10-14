const mongoose = require("mongoose")

const SmtpSchema = mongoose.Schema({
    headOfSmtp: {
        type: String, 
        required: true,
        trim: true, 
    },

    SmtpName: { 
        type: String,
        required: true,
        trim: true,
    },
    brief: {
        type: String,
        required: false,
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