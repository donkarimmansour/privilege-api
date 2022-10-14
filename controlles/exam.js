const ExamModel = require("../services/exam")
const codes = require("../common/codes")

 
// get All Exams
const getAllExams = (req, res) => {
    const { sort, limit, skip, filter, select } = req.query;

    ExamModel.getAllExams(sort, limit, skip, filter, select).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllExams}
