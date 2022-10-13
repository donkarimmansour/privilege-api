const DepartmentsRquest = require("../models/departmant")

// get All Departments
const getAllDepartments = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null) => {

    return new Promise((resolve, reject) => {

        DepartmentsRquest.find({}, (errFind, departments) => {


            if (errFind) {
                reject(errFind)
            } else if (departments.length <= 0) {
                reject("there are no departments")
            } else {


                resolve(departments)

            }


        })
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })


    })
}

// get All Departments Count
const getAllDepartmentsCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        DepartmentsRquest.find({}, (errFind, departments) => {

            if (errFind) {
                reject(errFind)
            } else if (departments.length <= 0) {
                reject("there are no Departments")
            } else {


                resolve(departments)

            }


        }).count({ ...JSON.parse(filter) })

    })
}

// create Department
const createDepartment = (eadOfDepartment, departmentName, brief) => {

    return new Promise((resolve, reject) => { // check email

                // inser a new Department
                DepartmentsRquest.create({
                    eadOfDepartment, departmentName, brief
                }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                        return
                    }
                    resolve(res._id)

                })
    })
}

// edit Department
const editDepartment = (id, eadOfDepartment, departmentName, brief) => {
    return new Promise((resolve, reject) => { // update Department
        // check id
        DepartmentsRquest.findOne({}, (errFind, Department) => {

            if (errFind) {
                reject(errFind)
            } else if (!Department) {
                reject("id not exist")
            }else {

                DepartmentsRquest.updateOne({}, {
                    eadOfDepartment, departmentName, brief ,
                    updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate) {
                        reject(errUpdate)
                        return
                    }

                    if (doc.modifiedCount > 0) {
                        resolve("modified")


                    } else {
                        reject("something went wrong")

                    }

                }).where("_id").equals(id)

            }

        }).where("_id").equals(id)



    })
}



// delete Department
const deleteDepartment = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        DepartmentsRquest.findOne({}, (errFind, department) => {

            if (errFind) {
                reject(errFind)
            } else if (!department) {
                reject("id not exist")
            } else {

                //delete
                DepartmentsRquest.deleteOne({}
                    , (errUpdate, doc) => {
                        if (errUpdate) {
                            reject(errUpdate)
                            return
                        }

                        if (doc.deletedCount > 0) {
                            resolve("deleted")

                        } else {
                            reject("something went wrong")
                        }

                    }).where("_id").equals(id)
            }//else
        }).where("_id").equals(id)

    })
}


module.exports = { getAllDepartments, getAllDepartmentsCount, createDepartment, editDepartment, deleteDepartment  }
