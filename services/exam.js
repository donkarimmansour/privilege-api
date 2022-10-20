const ExamsRquest = require("../models/exam")
const StudentsRquest = require("../models/student")

// get All Exams
const getAllExams = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null  , expend = null) => {

    const newExpend = expend === "all" ? [{ path: 'studentID', model: 'student' , populate : {path : 'className', model: 'course'}}] : expend

    return new Promise((resolve, reject) => {

        ExamsRquest.find({}, (errFind, Exams) => { 

 
            if (errFind) {
                reject(errFind)
            } else if (Exams.length <= 0) {
                reject("there are no Exams")
            } else {


                resolve(Exams) 

            }


        })
            .populate(newExpend)
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })


    })
}




// create Exam
const createExam = (exam, rate, studentID) => {

    return new Promise((resolve, reject) => {

        // inser a new Group
        ExamsRquest.create({
            exam, rate, studentID
        }, (errInsert, res) => {
            if (errInsert) {
                reject(errInsert)
                return
            } else {
                StudentsRquest.updateOne({}, { tested: "yes" }, (errUpdate, doc) => {
                    if (errUpdate) {
                        reject(errUpdate)
                        return
                    }

                    if (doc.modifiedCount > 0) {
                        resolve("tested")

                    } else {
                        reject("something went wrong")

                    }

                }).where("_id").equals(studentID)
            }

        })
    })
}


module.exports = { getAllExams , createExam}
