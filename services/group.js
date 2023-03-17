const GroupsRquest = require("../models/group")

// get All Groups
const getAllGroups = (sort, limit, skip, filter) => {

    return new Promise((resolve, reject) => {

        GroupsRquest.aggregate([
            { $lookup: { from: `students`, localField: `_id`, foreignField: "group", as: `studentsCount` } },
            { $addFields: { studentsCount: { $size: "$studentsCount" } } },
            { $lookup: { from: `levels`, localField: `level`, foreignField: "_id", as: `levels` } },
            {
                $project: {
                    studentsCount: 1, name: 1, department: 1, position: 1, createdAt: 1, updatedAt: 1,
                    level: { $toString: "$level" }, levels: { $first: "$levels" }
                }
            },
            { $lookup: { from: `courses`, localField: "levels.className", foreignField: "_id", as: `className` } },
            { $lookup: { from: `departments`, localField: `department`, foreignField: "_id", as: `department` } },
            {
                $project: {
                    studentsCount: 1, name: 1, department: 1, position: 1, createdAt: 1, updatedAt: 1,
                    level: 1, levels: 1, className: { $first: "$className" }, department: { $first: "$department" }, _id: { $toString: "$_id" }
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
const createGroup = (name, level, department, position) => {

    return new Promise((resolve, reject) => { // check email

                // inser a new Group
                GroupsRquest.create({
                    name, level, department, position

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
const editGroup = (id, name, level, department, position) => {
    return new Promise((resolve, reject) => { // update Group

 
                GroupsRquest.updateOne({}, {
                    name, level, department, position , updatedAt: Date.now() 
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
