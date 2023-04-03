const mongoose = require("mongoose")

const NotificationSchema = mongoose.Schema({
   
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },

    seen: {
        type: Boolean,
        required: false,
        default: false,
    },

    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "student",
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

const NotificationsRquest = mongoose.model("notification", NotificationSchema)

module.exports =  NotificationsRquest