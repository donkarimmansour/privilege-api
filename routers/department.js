const DepartmentControlles = require("../controlles/department")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { DepartmentValidator  } = require("../middlewares/validators")

// getall Department
router.get(ApiEndpoints.Department.list , passport.authenticate("admin", {session: false}) ,  DepartmentControlles.getAllDepartments ,  handleError)

// count Department
router.get(ApiEndpoints.Department.count , passport.authenticate("admin", {session: false}) ,  DepartmentControlles.getAllDepartmentsCount , handleError)

// create Department
router.post(ApiEndpoints.Department.create,passport.authenticate("admin", {session: false})  ,  DepartmentValidator, HandleValidatorError , DepartmentControlles.createDepartment , handleError)

// edit Department
router.put(ApiEndpoints.Department.edit , passport.authenticate("admin", {session: false}) , DepartmentValidator , idValidator, HandleValidatorError , DepartmentControlles.editDepartment , handleError)


// delete Department
router.delete(ApiEndpoints.Department.delete , passport.authenticate("admin", {session: false}), idValidator , DepartmentControlles.deleteDepartment , handleError)


module.exports = router