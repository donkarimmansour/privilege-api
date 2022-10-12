const StudentsRquest = require("../models/student")

// get All Students
const getAllStudents = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    return new Promise((resolve, reject) => {

        StudentsRquest.find({}, (errFind, students) => {


            if (errFind) {
                reject(errFind)
            } else if (students.length <= 0) {
                reject("there are no students")
            } else {


                resolve(students)

            }


        })
            .populate(expend)
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
const createStudent = (firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, className, group, level, hours, option, session, cin , isAccountActivated, image) => {

    return new Promise((resolve, reject) => { // check email
        StudentsRquest.findOne({}, (errFind, student) => {

            if (errFind) {
                reject(errFind)
            } else if (student) {
                reject("the email or username already exists")
            } else {
                // inser a new student
                StudentsRquest.create({
                    firstname, lastname, gender, phone, birthday, username, email, facebook, twitter, linkedin, className, group, level, hours, option, session, cin,
                    password: new StudentsRquest().hashPassword(password), image , isAccountActivated

                }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                        return
                    }


                    resolve(res._id)


                })
            }



        }).or([{ email }, { username }])
    })
}

// edit Student
const editStudent = (id, firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, className, group, level, hours, option, session, cin , isAccountActivated) => {
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


                StudentsRquest.updateOne({}, {
                    password: newpassword,
                    firstname, lastname, gender, phone, birthday, username, email, facebook, twitter, linkedin, className, group, level, hours, option, session, cin,
                    updatedAt: Date.now() , isAccountActivated
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


// edit Student Profile
const editStudentProfile = (id, firstname, lastname, phone, email, password, facebook, twitter, linkedin) => {
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
                    password: newpassword,
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
const editStudentImage = (id, image) => {
    return new Promise((resolve, reject) => { // update user
        // check id
        StudentsRquest.findOneAndUpdate({}, { image, updatedAt: Date.now() }, (errFind, student) => {
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

                //delete
                StudentsRquest.deleteOne({}
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


module.exports = { getAllStudents, getAllStudentsCount, createStudent, editStudent, editStudentProfile, editStudentImage, deleteStudent  }
