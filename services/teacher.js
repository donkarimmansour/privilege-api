const TeachersRquest = require("../models/teacher")

// get All Teachers
const getAllTeachers = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    return new Promise((resolve, reject) => {

        TeachersRquest.find({}, (errFind, teachers) => {


            if (errFind) {
                reject(errFind)
            } else if (teachers.length <= 0) {
                reject("there are no Teachers")
            } else {


                resolve(teachers)

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

// get All Teachers Count
const getAllTeachersCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        TeachersRquest.find({}, (errFind, teachers) => {

            if (errFind) {
                reject(errFind)
            } else if (teachers.length <= 0) {
                reject("there are no Teachers")
            } else {


                resolve(teachers)

            }


        }).count({ ...JSON.parse(filter) })

    })
}

// create Teacher
const createTeacher = (firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, teach, website , note , isAccountActivated , image) => {

    return new Promise((resolve, reject) => { // check email
        TeachersRquest.findOne({}, (errFind, Teacher) => {

            if (errFind) {
                reject(errFind)
            } else if (Teacher) {
                reject("the email or username already exists")
            } else {
                // inser a new Teacher
                TeachersRquest.create({
                    firstname, lastname, gender, phone, birthday, username, email, facebook, twitter, linkedin, teach, website , note  ,
                    password: new TeachersRquest().hashPassword(password), image , isAccountActivated

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

// edit Teacher
const editTeacher = (id, firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, teach, website , note , isAccountActivated , image) => {
    return new Promise((resolve, reject) => { // update Teacher
        // check id
        TeachersRquest.findOne({}, (errFind, Teacher) => {

            if (errFind) {
                reject(errFind)
            } else if (!Teacher) {
                reject("id not exist")
            } 
            
            // else if (Teacher.username === username || Teacher.email === email) {
            //     reject("the email or username already exists")
            // } 
            
            else {




                //update
                const newpassword = (password == "") ? Teacher.password : Teacher.hashPassword(password)


                TeachersRquest.updateOne({}, {
                    password: newpassword,
                    firstname, lastname, gender, phone, birthday, username, email, facebook, twitter, linkedin, teach, website , note  ,
                    updatedAt: Date.now() , isAccountActivated , image
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


// edit Teacher Profile
const editTeacherProfile = (id, firstname, lastname, phone, email, website , password, facebook, twitter, linkedin) => {
    return new Promise((resolve, reject) => { // update Teacher
        // check id
        TeachersRquest.findOne({}, (errFind, teacher) => {


            if (errFind) {
                reject(errFind)
            } else if (!Teacher) {
                reject("id not exist")
            } 
            
            // else if (Teacher.email === email) {
            //     reject("the email already exists")
            // }
            
            else {


                //update
                const newpassword = (password == "") ? teacher.password : teacher.hashPassword(password)

                TeachersRquest.updateOne({}, {
                    password: newpassword,
                    firstname, lastname, phone, email, website , facebook, twitter, linkedin ,
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


// edit Teacher Image
const editTeacherImage = (id, image) => {
    return new Promise((resolve, reject) => { // update user
        // check id
        TeachersRquest.findOneAndUpdate({}, { image, updatedAt: Date.now() }, (errFind, teacher) => {
            if (errFind) {
                reject(errFind)
            } else if (!teacher) {
                reject("id not exist")
            } else {

                //update
                resolve(teacher.image)

            }

        }).where("_id").equals(id)



    })
}


// delete Teacher
const deleteTeacher = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        TeachersRquest.findOne({}, (errFind, teacher) => {

            if (errFind) {
                reject(errFind)
            } else if (!teacher) {
                reject("id not exist")
            } else {

                //delete
                TeachersRquest.deleteOne({}
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


module.exports = { getAllTeachers, getAllTeachersCount, createTeacher, editTeacher, editTeacherProfile, editTeacherImage, deleteTeacher  }
