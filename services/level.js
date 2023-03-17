const LevelsRquest = require("../models/level")

// get All Levels
const getAllLevels = (sort, limit, skip, filter) => {

    return new Promise((resolve, reject) => {

        console.log(filter);

        LevelsRquest.aggregate([
            { $lookup: { from: `students`, localField: `_id`, foreignField: "level", as: `studentsCount` } },
            { $addFields: { studentsCount: { $size: "$studentsCount" } } },
            { $lookup: { from: `courses`, localField: `className`, foreignField: "_id", as: `classNames` } },
            {
                $project: {
                    studentsCount: 1, name: 1, createdAt: 1, updatedAt: 1,
                    className: { $toString: "$className" }, classNames: { $first: "$classNames" }, _id: { $toString: "$_id" }
                }
            },
            { $match: filter ? JSON.parse(filter) : {} },
            { $skip: skip ? parseInt(skip) : 0 },
            { $limit: limit ? parseInt(limit) : 1000 },
            { $sort: sort ? JSON.parse(sort) : { "_id": 1 } }
        ]).exec().then(levels => {

            if (levels.length <= 0) {
                reject("there are no Levels")
                return
            }

            resolve(levels) 

        }).catch(err => { reject(err) })

       

    })
}

// get All Levels Count
const getAllLevelsCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        LevelsRquest.find({}, (errFind, levels) => {

            if (errFind) {
                reject(errFind)
            } else if (levels.length <= 0) {
                reject("there are no Levels")
            } else {


                resolve(levels)

            }


        }).count({ ...JSON.parse(filter) })

    })
}

// create Level
const createLevel = (name, className) => {

    return new Promise((resolve, reject) => { // check email

                // inser a new Level
                LevelsRquest.create({
                    name, className
                }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                        return
                    }


                    resolve(res._id)


                })
    })
}

// edit Level
const editLevel = (id, name, className) => {
    return new Promise((resolve, reject) => { // update Level
        // check id
        LevelsRquest.findOne({}, (errFind, Level) => {

            if (errFind) {
                reject(errFind)
            } else if (!Level) {
                reject("id not exist")
            }else {

                LevelsRquest.updateOne({}, {
                    name, className , updatedAt: Date.now() 
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



// delete Level
const deleteLevel = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        LevelsRquest.findOne({}, (errFind, level) => {

            if (errFind) {
                reject(errFind)
            } else if (!level) {
                reject("id not exist")
            } else {

                //delete
                LevelsRquest.deleteOne({}
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


module.exports = { getAllLevels, getAllLevelsCount, createLevel, editLevel, deleteLevel  }
