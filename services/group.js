const GroupsRquest = require("../models/group")

// get All Groups
const getAllGroups = (sort, limit, skip, filter) => {

    return new Promise((resolve, reject) => {

        GroupsRquest.aggregate([
            { $lookup: { from: `students`, localField: `_id`, foreignField: "group", as: `studentsCount` } },
            { $addFields: { studentsCount: { $size: "$studentsCount" } } },
            { $lookup: { from: `levels`, localField: `level`, foreignField: "_id", as: `levels` } },
            { $lookup: { from: `languages`, localField: "language", foreignField: "_id", as: `languages` } },
            { $lookup: { from: `departments`, localField: `department`, foreignField: "_id", as: `departments` } },
            { $lookup: { from: `teachers`, localField: `teacher`, foreignField: "_id", as: `teachers` } },
            { 
                $project: {
                    studentsCount: 1, name: 1, createdAt: 1, updatedAt: 1, actions: 1,option: 1, session: 1, calindar: 1,
                    levels: { $first: "$levels" }, languages: { $first: "$languages" }, departments: { $first: "$departments" }, teachers: { $first: "$teachers" },
                    level: { $toString: "$level" }, language: { $toString: "$language" }, department: { $toString: "$department" },
                    teacher: { $toString: "$teacher" }, _id: { $toString: "$_id" }
                }
            },
            { $match: filter ? JSON.parse(filter) : {} },
            { $skip: skip ? parseInt(skip) : 0 },
            { $limit: limit ? parseInt(limit) : 1000 },
            { $sort: sort ? JSON.parse(sort) : { "_id": 1 } }
        ]).exec().then(groups => {

            if (groups.length <= 0) {
                reject("there are no Groups")
                return
            }

            resolve(groups)

        
        }).catch(err => { reject(err) })


    })
}

// get All Groups Count
const getAllGroupsCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        GroupsRquest.find({}, (errFind, groups) => {

            if (errFind) {
                reject(errFind)
            } else if (groups.length <= 0) {
                reject("there are no Groups")
            } else {


                resolve(groups)

            }


        }).count({ ...JSON.parse(filter) })

    }) 
}

// create Group
const createGroup = (name, level, department, language, teacher, session,calindar,option,actions) => {

    return new Promise((resolve, reject) => { // check email

                // inser a new Group
                GroupsRquest.create({
                    name, level, department, language, teacher, session,calindar,option,actions: [actions]
                }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                        return
                    }


                    resolve(res._id)


                })
    })
}

// edit Group
const editGroup = (id, name, level, department, language, teacher, session,calindar,option,actions) => {
    return new Promise((resolve, reject) => { // update Group

 
                GroupsRquest.updateOne({}, {
                    name, level, department, language, teacher, session,calindar,option, $push: {actions} , updatedAt: Date.now() 
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
    })
}



// delete Group
const deleteGroup = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        GroupsRquest.findOne({}, (errFind, group) => {

            if (errFind) {
                reject(errFind)
            } else if (!group) {
                reject("id not exist")
            } else {

                //delete
                GroupsRquest.deleteOne({}
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


module.exports = { getAllGroups, getAllGroupsCount, createGroup, editGroup , deleteGroup  }
