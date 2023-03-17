const TeacherControlles = require("../controlles/teacher")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { TeacherValidator , ImageValidator , StudentProfileValidator  } = require("../middlewares/validators")

// getall Teachers
router.get(ApiEndpoints.Professors.list , passport.authenticate("teacherOradmin", {session: false}) ,  TeacherControlles.getAllTeachers ,  handleError)

// count Teachers
router.get(ApiEndpoints.Professors.count , passport.authenticate("admin", {session: false}) ,  TeacherControlles.getAllTeachersCount , handleError)

// create Teacher
router.post(ApiEndpoints.Professors.create,passport.authenticate("admin", {session: false})  ,  TeacherValidator, HandleValidatorError , TeacherControlles.createTeacher , handleError)

// edit Teacher
router.put(ApiEndpoints.Professors.edit , passport.authenticate("admin", {session: false}) , TeacherValidator , idValidator, HandleValidatorError , TeacherControlles.editTeacher , handleError)

// edit Teacher profile
router.put(ApiEndpoints.Professors.profileEdit , passport.authenticate("admin", {session: false}) , StudentProfileValidator , idValidator, HandleValidatorError , TeacherControlles.editTeacherProfile , handleError)

// edit image
router.put(ApiEndpoints.Professors.image , passport.authenticate("admin", {session: false}) , ImageValidator , idValidator, HandleValidatorError , TeacherControlles.editTeacherImage , handleError)
 
// delete Teacher
router.delete(ApiEndpoints.Professors.delete , passport.authenticate("admin", {session: false}), idValidator , TeacherControlles.deleteTeacher , handleError)


module.exports = router