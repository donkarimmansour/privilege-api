const CancelationControlles = require("../controlles/cancelation")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { CancelationValidator  } = require("../middlewares/validators")

// getall Cancelation
router.get(ApiEndpoints.Cancelations.list , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  CancelationControlles.getAllCancelations ,  handleError)
 
// count Cancelations
router.get(ApiEndpoints.Cancelations.count , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  CancelationControlles.getAllCancelationsCount , handleError)

// create Cancelation 
router.post(ApiEndpoints.Cancelations.create,passport.authenticate("adminOrsuperAdmin", {session: false})  ,  CancelationValidator, HandleValidatorError , CancelationControlles.createCancelation , handleError)

// edit Cancelation
router.put(ApiEndpoints.Cancelations.edit , passport.authenticate("adminOrsuperAdmin", {session: false}) , CancelationValidator , idValidator, HandleValidatorError , CancelationControlles.editCancelation , handleError)

// delete Cancelation
router.delete(ApiEndpoints.Cancelations.delete , passport.authenticate("superAdmin", {session: false}), idValidator , CancelationControlles.deleteCancelation , handleError)


module.exports = router