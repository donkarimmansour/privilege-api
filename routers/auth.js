const AuthControlles = require("../controlles/auth")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const {SignInValidator , forgotPasswordValidator} = require("../middlewares/validators")


// login
router.post(ApiEndpoints.Auth.signin, SignInValidator ,  HandleValidatorError , AuthControlles.SignIn)

// get me
router.get(ApiEndpoints.Auth.me , passport.authenticate("admin", {session: false}) ,  AuthControlles.getMe ,  handleError)

// forgot password
router.put(ApiEndpoints.Auth.forgot , forgotPasswordValidator,  HandleValidatorError , AuthControlles.forgotPassword)

module.exports = router