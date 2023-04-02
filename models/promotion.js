const mongoose = require("mongoose")

const PromotionSchema = mongoose.Schema({
   
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

    language: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "language"
    },

    session: {
        type: {
            hours: { type: Number,  hours: true},
            normale: { type: Number,  required: true},
            accelerated: { type: Number,  required: true},
            superAccelerated: { type: Number,  required: true},
        },
        required: true,
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

const PromotionsRquest = mongoose.model("promotion", PromotionSchema)

module.exports =  PromotionsRquest