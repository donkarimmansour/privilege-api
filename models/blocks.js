const mongoose = require("mongoose")
 
const BlockSchema = mongoose.Schema({
   
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "student",
    },
    
    description: {
        type: String,
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

const BlocksRquest = mongoose.model("block", BlockSchema)

module.exports =  BlocksRquest