const TeachersRquest = require("../models/teacher")

// get All Teachers
const getAllTeachers = (sort, limit, skip, filter) => {

    return new Promise((resolve, reject) => {
        
       TeachersRquest.aggregate([
            { $lookup: { from: `groups`, localField: `_id`, foreignField: "teacher", as: `group` } },
            { $addFields: { group: { $first: `$group._id` } } },
            { $lookup: { from: `students`, localField: `group`, foreignField: "group", as: `studentsCount` } },
            { $addFields: { studentsCount: { $size: "$studentsCount" } } },
            { $lookup: { from: `languages`, localField: "language", foreignField: "_id", as: `languages` } },
            { $addFields: { languages: { $first: "$languages" }, _id: {$toString: "$_id"} , language: {$toString: "$language"} , cours: { $first: "$languages.name" } } },
            { $match: filter ? JSON.parse(filter) : {} },
            { $skip: skip ? parseInt(skip) : 0 },
            { $limit: limit ? parseInt(limit) : 1000 },
            { $sort: sort ? JSON.parse(sort) : { "_id": 1 } }
        ]).exec().then(teachers => {

            if (teachers.length <= 0) {
                reject("there are no Teachers")
                return
            }

            resolve(teachers)

        
        }).catch(err => { reject(err) })

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
const createTeacher = (firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, language, website , note , isAccountActivated , image, actions) => {

    return new Promise((resolve, reject) => { // check email
        TeachersRquest.findOne({}, (errFind, Teacher) => {

            if (errFind) {
                reject(errFind)
            } else if (Teacher) {
                reject("the email or username already exists")
            } else {
                // inser a new Teacher
                TeachersRquest.create({
                    firstname, lastname, gender, phone, birthday, username, email, facebook, twitter, linkedin, language, website , note, actions: [actions],
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
const editTeacher = (id, firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, language, website , note , isAccountActivated , image, actions) => {
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
                    password: newpassword, $push: {actions},
                    firstname, lastname, gender, phone, birthday, username, email, facebook, twitter, linkedin, language, website , note  ,
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
const editTeacherProfile = (id, firstname, lastname, phone, email, website , password, facebook, twitter, linkedin, actions) => {
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
                    password: newpassword, $push: {actions},
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
const editTeacherImage = (id, image, actions) => {
    return new Promise((resolve, reject) => { // update user
        // check id
        TeachersRquest.findOneAndUpdate({}, { image, $push: {actions}, updatedAt: Date.now() }, (errFind, teacher) => {
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
