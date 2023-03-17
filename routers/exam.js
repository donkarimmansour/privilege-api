const ExamControlles = require("../controlles/exam")
const { handleError , passport , ApiEndpoints , HandleValidatorError } = require("../common/routersImports")
const { ExamValidator } = require("../middlewares/validators")
const router = require("express").Router()

// getall Exams
router.get(ApiEndpoints.Exam.list , passport.authenticate("all", {session: false}) ,  ExamControlles.getAllExams ,  handleError)

// create Exam
router.post(ApiEndpoints.Exam.create,passport.authenticate("student", {session: false})  ,  ExamValidator, HandleValidatorError , ExamControlles.createExam , handleError)

module.exports = router