const mongoose = require("mongoose")

const PaymentSchema = mongoose.Schema({ 

    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "student",
    },

    // paymentStatus: {
    //     type: String, 
    //     required: true,
    //     trim: true,
    // },

    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },

    // paymentDuration: {
    //     type: String,
    //     required: true,
    //     trim: true,
    // },

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

    // pending: {
    //     type: Number,
    //     required: true,
    //     trim: true,
    // },

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


const PaymentsRquest = mongoose.model("payment", PaymentSchema)

module.exports =  PaymentsRquest