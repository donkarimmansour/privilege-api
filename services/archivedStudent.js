const ArchivedStudentsRquest = require("../models/archivedStudent")

// get All Archived Students
const getAllArchivedStudents = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    
    return new Promise((resolve, reject) => {

        const newExpend = expend === "all" ? [{path: 'language', model: 'language'}, {path: 'group',model: 'group'}, {path: 'level',model: 'level'}] : expend

        ArchivedStudentsRquest.find({}, (errFind, Archivedstudents) => {

            if (errFind) {
                reject(errFind)
            } else if (Archivedstudents.length <= 0) {
                reject("there are no Archivedstudents")
            } else {
                resolve(Archivedstudents)

            }

        }).populate(newExpend)
        .select(select)
        .sort(JSON.parse(sort))
        .limit(parseInt(limit))
        .skip(parseInt(skip)) 
        .setQuery({ ...JSON.parse(filter) })


    })
}






// get All Archived Students Count
const getAllArchivedStudentsCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        ArchivedStudentsRquest.find({}, (errFind, Archivedstudents) => {

            if (errFind) {
                reject(errFind)
            } else if (Archivedstudents.length <= 0) {
                reject("there are no Archivedstudents")
            } else {


                resolve(Archivedstudents)

            }


        }).count({ ...JSON.parse(filter) })

    })
}


module.exports = { getAllArchivedStudents, getAllArchivedStudentsCount }
