const mongoose = require("mongoose")

const DepartmentSchema = mongoose.Schema({
    headOfDepartment: {
        type: String,
        required: true,
        trim: true,
    },

    departmentName: { 
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

const DepartmentsRquest = mongoose.model("department", DepartmentSchema)

module.exports =  DepartmentsRquest