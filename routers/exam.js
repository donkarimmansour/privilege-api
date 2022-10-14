const ExamControlles = require("../controlles/exam")
const { handleError , passport , ApiEndpoints } = require("../common/routersImports")
const router = require("express").Router()

// getall Exams
router.get(ApiEndpoints.Exam.list , passport.authenticate("admin", {session: false}) ,  ExamControlles.getAllExams ,  handleError)


module.exports = router