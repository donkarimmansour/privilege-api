const TeacherControlles = require("../controlles/teacher")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { TeacherValidator , ImageValidator , StudentProfileValidator  } = require("../middlewares/validators")

// getall Teachers
router.get(ApiEndpoints.Teachers.list , passport.authenticate("teacherOradminOrsuperAdmin", {session: false}) ,  TeacherControlles.getAllTeachers ,  handleError)

// count Teachers
router.get(ApiEndpoints.Teachers.count , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  TeacherControlles.getAllTeachersCount , handleError)

// create Teacher
router.post(ApiEndpoints.Teachers.create,passport.authenticate("adminOrsuperAdmin", {session: false})  ,  TeacherValidator, HandleValidatorError , TeacherControlles.createTeacher , handleError)

// edit Teacher
router.put(ApiEndpoints.Teachers.edit , passport.authenticate("adminOrsuperAdmin", {session: false}) , TeacherValidator , idValidator, HandleValidatorError , TeacherControlles.editTeacher , handleError)

// edit Teacher profile
router.put(ApiEndpoints.Teachers.profileEdit , passport.authenticate("teacherOradminOrsuperAdmin", {session: false}) , StudentProfileValidator , idValidator, HandleValidatorError , TeacherControlles.editTeacherProfile , handleError)

// edit image
router.put(ApiEndpoints.Teachers.image , passport.authenticate("teacherOradminOrsuperAdmin", {session: false}) , ImageValidator , idValidator, HandleValidatorError , TeacherControlles.editTeacherImage , handleError)
 
// delete Teacher
router.delete(ApiEndpoints.Teachers.delete , passport.authenticate("superAdmin", {session: false}), idValidator , TeacherControlles.deleteTeacher , handleError)


module.exports = router