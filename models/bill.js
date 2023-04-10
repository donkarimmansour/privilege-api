const mongoose = require("mongoose")

const BillSchema = mongoose.Schema({
   
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "student",
    }, 

    amount: {
        type: Number,
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

    status: {
        type: String,
        required: true,
        trim: true,
        default: "active",
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

const BillsRquest = mongoose.model("bill", BillSchema)

module.exports =  BillsRquest