const SmtpControlles = require("../controlles/smtp")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { SmtpValidator  } = require("../middlewares/validators")

// get Smtp
router.get(ApiEndpoints.Smtp.list , passport.authenticate("superAdmin", {session: false}) ,  SmtpControlles.getSmtp ,  handleError)

// edit Smtp
router.put(ApiEndpoints.Smtp.edit , passport.authenticate("superAdmin", {session: false}) , SmtpValidator , idValidator, HandleValidatorError , SmtpControlles.editSmtp , handleError)


module.exports = router