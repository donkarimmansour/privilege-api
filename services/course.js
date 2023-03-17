const CoursesRquest = require("../models/course")

// get All Courses
const getAllCourses = (sort, limit, skip, filter) => {

        return new Promise((resolve, reject) => { 

            CoursesRquest.aggregate([
                { $lookup: { from: `students`, localField: `_id`, foreignField: "className", as: `studentsCount` } },
                { $lookup: { from: `teachers`, localField: `_id`, foreignField: "teach", as: `teachersCount` } },
                { $addFields: { studentsCount: { $size: "$studentsCount" } } },
                { $addFields: { teachersCount: { $size: "$teachersCount" } } },
                {
                    $project: {
                        studentsCount: 1, teachersCount: 1, name: 1, description: 1, image: 1, createdAt: 1, updatedAt: 1,
                        _id: { $toString: "$_id" }
                    }
                },
                { $match: filter ? JSON.parse(filter) : {} },
                { $skip: skip ? parseInt(skip) : 0 },
                { $limit: limit ? parseInt(limit) : 1000 },
                { $sort: sort ? JSON.parse(sort) : { "_id": 1 } },
            ]).exec().then(courses => {
    
                if (courses.length <= 0) {
                    reject("there are no Courses")
                    return
                }
    
                resolve(courses)
    
            }).catch(err => { reject(err) })
    


    })
}


// get All Courses Count
const getAllCoursesCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        CoursesRquest.find({}, (errFind, courses) => {

            if (errFind) {
                reject(errFind)
            } else if (courses.length <= 0) {
                reject("there are no Courses")
            } else {


                resolve(courses)

            }


        }).count({ ...JSON.parse(filter) })

    })
}

// create Course
const createCourse = (name , description , image) => {

    return new Promise((resolve, reject) => { // check email
                // inser a new Course
                CoursesRquest.create({
                    name , description , image
                }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                        return
                    }
 

                    resolve(res._id)


                })
    })
}

// edit Course
const editCourse = (id, name , description , image) => {
    return new Promise((resolve, reject) => { // update Course
        // check id
        CoursesRquest.findOne({}, (errFind, Course) => {

            if (errFind) {
                reject(errFind)
            } else if (!Course) {
                reject("id not exist")
            }else {


                CoursesRquest.updateOne({}, {
                    name , description , image , updatedAt: Date.now() 
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


// edit Course Image
const editCourseImage = (id, image) => {
    return new Promise((resolve, reject) => { // update user
        // check id
        CoursesRquest.findOneAndUpdate({}, { image, updatedAt: Date.now() }, (errFind, course) => {
            if (errFind) {
                reject(errFind)
            } else if (!course) {
                reject("id not exist")
            } else {

                //update
                resolve(course.image)

            }

        }).where("_id").equals(id)



    })
}


// delete Course
const deleteCourse = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        CoursesRquest.findOne({}, (errFind, course) => {

            if (errFind) {
                reject(errFind)
            } else if (!course) {
                reject("id not exist")
            } else {

                //delete
                CoursesRquest.deleteOne({}
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
 
 
module.exports = { getAllCourses, getAllCoursesCount, createCourse, editCourse, editCourseImage, deleteCourse }
