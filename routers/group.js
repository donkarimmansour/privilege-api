const GroupControlles = require("../controlles/group")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { GroupValidator } = require("../middlewares/validators")

// getall Groups
router.get(ApiEndpoints.Groupes.list , passport.authenticate("all", {session: false}) ,  GroupControlles.getAllGroups ,  handleError)

// count Groups
router.get(ApiEndpoints.Groupes.count , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  GroupControlles.getAllGroupsCount , handleError)

// create Group
router.post(ApiEndpoints.Groupes.create,passport.authenticate("adminOrsuperAdmin", {session: false})  ,  GroupValidator, HandleValidatorError , GroupControlles.createGroup , handleError)

// edit Group
router.put(ApiEndpoints.Groupes.edit , passport.authenticate("adminOrsuperAdmin", {session: false}) , GroupValidator , idValidator, HandleValidatorError , GroupControlles.editGroup , handleError)

// delete Group
router.delete(ApiEndpoints.Groupes.delete , passport.authenticate("superAdmin", {session: false}), idValidator , GroupControlles.deleteGroup , handleError)


module.exports = router