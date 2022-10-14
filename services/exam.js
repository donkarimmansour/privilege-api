const ExamsRquest = require("../models/Exam")

// get All Exams
const getAllExams = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null) => {

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
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })


    })
}

module.exports = { getAllExams}
