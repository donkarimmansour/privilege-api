const ExamModel = require("../services/exam")
const codes = require("../common/codes")

 
// get All Exams
const getAllExams = (req, res) => {
    const { sort, limit, skip, filter, select , expend } = req.query;

    ExamModel.getAllExams(sort, limit, skip, filter, select , expend).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// create Exam 
const createExam = (req, res) => {
    const {exam, rate , studentID} = req.body;

    ExamModel.createExam(exam, rate , studentID).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


module.exports = { getAllExams , createExam}
