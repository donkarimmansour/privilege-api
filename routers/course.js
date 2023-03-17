const CourseControlles = require("../controlles/Course")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { CourseValidator , ImageValidator  } = require("../middlewares/validators")

// getall Courses
router.get(ApiEndpoints.Course.list , passport.authenticate("all", {session: false}) ,  CourseControlles.getAllCourses ,  handleError)

// count Courses
router.get(ApiEndpoints.Course.count , passport.authenticate("all", {session: false}) ,  CourseControlles.getAllCoursesCount , handleError)

// create Course
router.post(ApiEndpoints.Course.create,passport.authenticate("admin", {session: false})  ,  CourseValidator, HandleValidatorError , CourseControlles.createCourse , handleError)

// edit Course
router.put(ApiEndpoints.Course.edit , passport.authenticate("admin", {session: false}) , CourseValidator , idValidator, HandleValidatorError , CourseControlles.editCourse , handleError)

// edit image
router.put(ApiEndpoints.Course.image , passport.authenticate("admin", {session: false}) , ImageValidator , idValidator, HandleValidatorError , CourseControlles.editCourseImage , handleError)
 
// delete Course
router.delete(ApiEndpoints.Course.delete , passport.authenticate("admin", {session: false}), idValidator , CourseControlles.deleteCourse , handleError)


module.exports = router