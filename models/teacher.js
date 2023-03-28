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
        required: true,
        ref : "file",
        default : "64138ac11da720d3bad0847d"
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
    language: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "language"
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