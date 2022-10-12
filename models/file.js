const mongoose = require("mongoose")

const fileSchema = mongoose.Schema({
    file: {
        type: String,
        required: false,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const fileRquest = mongoose.model("file", fileSchema)



module.exports = fileRquest