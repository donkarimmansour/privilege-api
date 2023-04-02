const DepartmentControlles = require("../controlles/department")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { DepartmentValidator  } = require("../middlewares/validators")

// getall Department
router.get(ApiEndpoints.Department.list , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  DepartmentControlles.getAllDepartments ,  handleError)

// count Department
router.get(ApiEndpoints.Department.count , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  DepartmentControlles.getAllDepartmentsCount , handleError)

// create Department
router.post(ApiEndpoints.Department.create,passport.authenticate("adminOrsuperAdmin", {session: false})  ,  DepartmentValidator, HandleValidatorError , DepartmentControlles.createDepartment , handleError)

// edit Department
router.put(ApiEndpoints.Department.edit , passport.authenticate("adminOrsuperAdmin", {session: false}) , DepartmentValidator , idValidator, HandleValidatorError , DepartmentControlles.editDepartment , handleError)


// delete Department
router.delete(ApiEndpoints.Department.delete , passport.authenticate("superAdmin", {session: false}), idValidator , DepartmentControlles.deleteDepartment , handleError)


module.exports = router