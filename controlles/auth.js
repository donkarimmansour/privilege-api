const AuthService = require("../services/auth")
const codes = require("../common/codes")


// SignIn
const SignIn = (req, res) => {
    const {email , password , role} = req.body ;

    AuthService.SignIn(email , password , role).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(err => {
        res.status(codes.badRequest).json({err: true, msg : err})
    })
}

// me
const getMe = (req, res) => {
    const user = req.user ;

    if(user){
        res.status(codes.ok).json({err: false, msg : user})
    }else{
        res.status(codes.badRequest).json({err: true, msg : "empty"})
    }
    
}

// forgot Password 
const forgotPassword = (req, res) => {
    const {id} = req.params ;
    const { email , role } = req.body ;

    AuthService.forgotPassword(email , role).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(err => {
        res.status(codes.badRequest).json({err: true, msg : err})
    })
}



module.exports = {
    SignIn ,
    getMe ,
    forgotPassword 
}