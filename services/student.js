const StudentsRquest = require("../models/student")
const BillsRquest = require("../models/bill")
const ArchivedStudentsRquest = require("../models/archivedStudent")

// get All Students
const getAllStudents = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    
    return new Promise((resolve, reject) => {

        const newExpend = expend === "all" ? [{path: 'language', model: 'language'}, {path: 'group',model: 'group'}, {path: 'level',model: 'level'}] : expend

        StudentsRquest.find({}, (errFind, students) => {

            if (errFind) {
                reject(errFind)
            } else if (students.length <= 0) {
                reject("there are no students")
            } else {
                resolve(students)

            }

        }).populate(newExpend)
        .select(select)
        .sort(JSON.parse(sort))
        .limit(parseInt(limit))
        .skip(parseInt(skip)) 
        .setQuery({ ...JSON.parse(filter) })


    })
}






// get All Students Count
const getAllStudentsCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        StudentsRquest.find({}, (errFind, students) => {

            if (errFind) {
                reject(errFind)
            } else if (students.length <= 0) {
                reject("there are no students")
            } else {


                resolve(students)

            }


        }).count({ ...JSON.parse(filter) })

    })
}

// create Student
const createStudent = (tested , firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, language, group, level, hours, option, session, cin , isAccountActivated, image, actions, amount) => {

    return new Promise((resolve, reject) => { // check email
        StudentsRquest.findOne({}, (errFind, student) => {
            //group , level

            if (errFind) {
                reject(errFind)
            } else if (student) {
                reject("the email or username already exists")
            } else {
                // inser a new student
                StudentsRquest.create({
                    tested , firstname, lastname, gender, phone, birthday, username, email, facebook, twitter, linkedin, language, group, level , hours, option, session, cin, actions: [actions],
                    password: new StudentsRquest().hashPassword(password), image , isAccountActivated

                }, (errInsert, res) => {

                    if (errInsert) {
                        reject(errInsert)

                    }else{

                        if (res._doc.group && res._doc.level) {
                            ArchivedStudentsRquest.create({...res._doc, actions: [actions]}, (errInsert, _res) => {})
                        }

                        BillsRquest.create({
                            amount, studentID: res._id, actions: [actions]
                        }, (errInsert, _res) => {
                            if (errInsert) {
                                reject(errInsert)
                            } else {
                                resolve(res._id)
                            }
                        })
                        
                     
                    }

                })
            }



        }).or([{ email }, { username }])
    })
}

// edit Student
const editStudent = (id,tested , firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, language, group, level, hours, option, session, cin , isAccountActivated, actions, amount) => {
    return new Promise((resolve, reject) => { // update student
        // check id
        StudentsRquest.findOne({}, (errFind, student) => {

            if (errFind) {
                reject(errFind)
            } else if (!student) {
                reject("id not exist")
            } 
            
            // else if (student.username === username || student.email === email) {
            //     reject("the email or username already exists")
            // } 
            
            else {




                //update
                const newpassword = (password == "") ? student.password : student.hashPassword(password) 


                const insertData = {tested ,firstname, lastname, gender, phone, birthday, username, email, facebook, twitter, linkedin, language, group, level, hours, option, session, cin,isAccountActivated}
               
                StudentsRquest.updateOne({}, {
                    ...insertData, $push: { actions }, password: newpassword, updatedAt: Date.now()
                }, (errUpdate, doc) => {

                    if (errUpdate) {
                        reject(errUpdate)
                         
                    }else{

                        if (doc.modifiedCount > 0) {

                            if (group && level) {
                                ArchivedStudentsRquest.create({...insertData, actions: [actions]}, (errInsert, _res) => { 
                                    console.log(errInsert);
                                })
                            }

                            BillsRquest.findOne({studentID: id}, (errFind, bill) => {
                                if (errFind) {
                                    reject("something went wrong")
                                } else if (!bill) {
                                    BillsRquest.create({
                                        amount, studentID: id, actions: [{...actions, action: "add"}]
                                    }, (errInsert, _res) => {
                                        if (errInsert) {
                                            reject(errInsert)
                                        } else {
                                            resolve("modified")
                                        }
                                    })

                                } else {
                                    bill.amount = amount
                                    bill.actions.push(actions)
                                    bill.save()
                                    resolve("modified")
                                }
                            })


                        } else {
                            reject("something went wrong")

                        }

                }

                }).where("_id").equals(id)

            }

        }).where("_id").equals(id)



    })
}


// edit Student Profile
const editStudentProfile = (id, firstname, lastname, phone, email, password, facebook, twitter, linkedin, actions) => {
    return new Promise((resolve, reject) => { // update student
        // check id
        StudentsRquest.findOne({}, (errFind, student) => {


            if (errFind) {
                reject(errFind)
            } else if (!student) {
                reject("id not exist")
            } 
            
            // else if (student.email === email) {
            //     reject("the email already exists")
            // }
            
            else {


                //update
                const newpassword = (password == "") ? student.password : student.hashPassword(password)

                StudentsRquest.updateOne({}, {
                    password: newpassword, $push: {actions},
                    firstname, lastname, phone, email, facebook, twitter, linkedin,
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


// edit Student Image
const editStudentImage = (id, image, actions) => {
    return new Promise((resolve, reject) => { // update user
        // check id
        StudentsRquest.findOneAndUpdate({}, { image, $push: {actions}, updatedAt: Date.now() }, (errFind, student) => {
            if (errFind) {
                reject(errFind)
            } else if (!student) {
                reject("id not exist")
            } else {

                //update
                resolve(student.image)

            }

        }).where("_id").equals(id)



    })
}


// delete Student
const deleteStudent = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        StudentsRquest.findOne({}, (errFind, student) => {

            if (errFind) {
                reject(errFind)
            } else if (!student) {
                reject("id not exist")
            } else {

                if (student.group && student.level) {
                   delete student._doc._id
                    ArchivedStudentsRquest.create({...student._doc}, (errInsert, _res) => {  })
                }

                // //delete
                StudentsRquest.deleteOne({}
                    , (errUpdate, doc) => {
                        if (errUpdate) {
                            reject(errUpdate)
                        }else if (doc.deletedCount > 0) {
                            resolve("deleted")

                        } else {
                            reject("something went wrong")
                        }

                    }).where("_id").equals(id)
            }//else
        }).where("_id").equals(id)

    })
}


module.exports = { getAllStudents, getAllStudentsCount, createStudent, editStudent, editStudentProfile, editStudentImage, deleteStudent  }
