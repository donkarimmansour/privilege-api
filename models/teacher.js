const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const TeacherSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },

    firstname: {
        type: String,
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: { 
        type: String,
        required: true,
        trim: true,
        unique : true
    },

    phone: {
        type: String,
        required: true,
        trim: true, 
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },

    birthday: {
        type: Date,
        required: true,
        trim: true,
    },


    image: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        trim: true,
        ref : "file",
        default : "6345c36928d91b2909c053e7"
    },

    gender: { 
        type: String,
        required: true,
        enum : ["male" , "female"] ,
    },
    isAccountActivated: {
        type: String,
        required: true,
        enum : ["no" , "yes"] ,
    } ,
    teach: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref : "course"
    },

    
    website: {
        type: String,
        required: false,
        trim: true,
    },

    note: {
        type: String,
        required: false,
        trim: true,
    },

    
    facebook: {
        type: String,
        required: false,
        trim: true,
    },
  
    facebook: {
        type: String,
        required: false,
        trim: true,
    },
    twitter: {
        type: String,
        required: false,
        trim: true,
    },
    linkedin: {
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


// hash Password
TeacherSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// compare Password
TeacherSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}



const TeachersRquest = mongoose.model("teacher", TeacherSchema)

module.exports =  TeachersRquest