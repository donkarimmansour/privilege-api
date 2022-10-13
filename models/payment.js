const mongoose = require("mongoose")

const PaymentSchema = mongoose.Schema({

    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref : "student",
    },


    paymentStatus: {
        type: String,
        required: true,
        trim: true,
    },

    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },

    paymentDuration: {
        type: String,
        required: true,
        trim: true,
    },

    paymentReference: {
        type: String,
        required: false,
        trim: true,
    },

    paymentDetails: {
        type: String,
        required: false,
        trim: true,
    },

    feesType: {
        type: String,
        required: false,
        trim: true,
    },

    pending: {
        type: Number,
        required: true,
        trim: true,
    },

    amount: {
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


const PaymentsRquest = mongoose.model("payment", PaymentSchema)

module.exports =  PaymentsRquest