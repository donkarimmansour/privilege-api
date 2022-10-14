const mongoose = require("mongoose")

const NotificationSchema = mongoose.Schema({
   
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