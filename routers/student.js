const StudentControlles = require("../controlles/student")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { StudentValidator , ImageValidator , StudentProfileValidator  } = require("../middlewares/validators")

// getall students
router.get(ApiEndpoints.Students.list , passport.authenticate("admin", {session: false}) ,  StudentControlles.getAllStudents ,  handleError)

// count students
router.get(ApiEndpoints.Students.count , passport.authenticate("admin", {session: false}) ,  StudentControlles.getAllStudentsCount , handleError)

// create student
router.post(ApiEndpoints.Students.create,passport.authenticate("admin", {session: false})  ,  StudentValidator, HandleValidatorError , StudentControlles.createStudent , handleError)

// edit student
router.put(ApiEndpoints.Students.edit , passport.authenticate("admin", {session: false}) , StudentValidator , idValidator, HandleValidatorError , StudentControlles.editStudent , handleError)

// edit student profile
router.put(ApiEndpoints.Students.profileEdit , passport.authenticate("admin", {session: false}) , StudentProfileValidator , idValidator, HandleValidatorError , StudentControlles.editStudentProfile , handleError)

// edit image
router.put(ApiEndpoints.Students.image , passport.authenticate("admin", {session: false}) , ImageValidator , idValidator, HandleValidatorError , StudentControlles.editStudentImage , handleError)
 
// delete student
router.delete(ApiEndpoints.Students.delete , passport.authenticate("admin", {session: false}), idValidator , StudentControlles.deleteStudent , handleError)


module.exports = router