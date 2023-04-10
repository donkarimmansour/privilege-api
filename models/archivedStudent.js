const mongoose = require("mongoose")

const ArchivedStudentSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },

    firstname: {
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
        trim: true
    },

    phone: {
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
        default : "64138abb1da720d3bad0847a"
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

    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref : "group"
    },


    level: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref : "level"
    },

    hours: {
        type: Number,
        required: true,
    },

    option: {
        type: String,
        required: true,
        trim: true,
    },

    session: {
        type: String,
        required: true,
        trim: true,
    },

    cin: {
        type: String,
        required: true,
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


    tested: {
        type: String,
        required: true,
        enum : ["no" , "yes"] 
    } ,

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
   
})

const ArchivedStudentsRquest = mongoose.model("archivedStudent", ArchivedStudentSchema)

module.exports =  ArchivedStudentsRquest