const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const AdminSchema = mongoose.Schema({
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

    role: { 
        type: String,
        required: true,
        enum : ["admin" , "superAdmin"] ,
    },

    isAccountActivated: {
        type: String,
        required: true,
        enum : ["no" , "yes"] ,
    } ,
    


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
AdminSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// compare Password
AdminSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const AdminsRquest = mongoose.model("admin", AdminSchema)

module.exports =  AdminsRquest