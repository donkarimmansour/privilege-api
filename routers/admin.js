const AdminControlles = require("../controlles/admin")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { AdminValidator , ImageValidator , StudentProfileValidator  } = require("../middlewares/validators")

// getall Admins
router.get(ApiEndpoints.Admins.list , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  AdminControlles.getAllAdmins ,  handleError)

// count Admins
router.get(ApiEndpoints.Admins.count , passport.authenticate("superAdmin", {session: false}) ,  AdminControlles.getAllAdminsCount , handleError)

// create Admin
router.post(ApiEndpoints.Admins.create,passport.authenticate("superAdmin", {session: false})  ,  AdminValidator, HandleValidatorError , AdminControlles.createAdmin , handleError)

// edit Admin
router.put(ApiEndpoints.Admins.edit , passport.authenticate("superAdmin", {session: false}) , AdminValidator , idValidator, HandleValidatorError , AdminControlles.editAdmin , handleError)

// edit Admin profile
router.put(ApiEndpoints.Admins.profileEdit , passport.authenticate("adminOrsuperAdmin", {session: false}) , StudentProfileValidator , idValidator, HandleValidatorError , AdminControlles.editAdminProfile , handleError)

// edit image
router.put(ApiEndpoints.Admins.image , passport.authenticate("adminOrsuperAdmin", {session: false}) , ImageValidator , idValidator, HandleValidatorError , AdminControlles.editAdminImage , handleError)
 
// delete Admin
router.delete(ApiEndpoints.Admins.delete , passport.authenticate("superAdmin", {session: false}), idValidator , AdminControlles.deleteAdmin , handleError)


module.exports = router