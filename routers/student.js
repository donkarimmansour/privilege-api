const StudentControlles = require("../controlles/student")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { StudentValidator , ImageValidator , StudentProfileValidator  } = require("../middlewares/validators")

// getall students
router.get(ApiEndpoints.Students.list , passport.authenticate("all", {session: false}) ,  StudentControlles.getAllStudents ,  handleError)

// count students
router.get(ApiEndpoints.Students.count , passport.authenticate("all", {session: false}) ,  StudentControlles.getAllStudentsCount , handleError)

// create student
router.post(ApiEndpoints.Students.create,passport.authenticate("adminOrsuperAdmin", {session: false})  ,  StudentValidator, HandleValidatorError , StudentControlles.createStudent , handleError)

// edit student
router.put(ApiEndpoints.Students.edit , passport.authenticate("adminOrsuperAdmin", {session: false}) , StudentValidator , idValidator, HandleValidatorError , StudentControlles.editStudent , handleError)

// edit student profile
router.put(ApiEndpoints.Students.profileEdit , passport.authenticate("studentOradminOrsuperAdmin", {session: false}) , StudentProfileValidator , idValidator, HandleValidatorError , StudentControlles.editStudentProfile , handleError)

// edit image
router.put(ApiEndpoints.Students.image , passport.authenticate("studentOradminOrsuperAdmin", {session: false}) , ImageValidator , idValidator, HandleValidatorError , StudentControlles.editStudentImage , handleError)
 
// delete student
router.delete(ApiEndpoints.Students.delete , passport.authenticate("superAdmin", {session: false}), idValidator , StudentControlles.deleteStudent , handleError)


module.exports = router