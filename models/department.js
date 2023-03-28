const mongoose = require("mongoose")

const DepartmentSchema = mongoose.Schema({
    floorName: {
        type: String,
        required: true,
        trim: true, 
    },

    className: { 
        type: String,
        required: true,
        trim: true,
    },
    
    brief: {
        type: String,
        required: false,
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

const DepartmentsRquest = mongoose.model("department", DepartmentSchema)

module.exports =  DepartmentsRquest