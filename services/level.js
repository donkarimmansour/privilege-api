const LevelsRquest = require("../models/level")

// get All Levels
const getAllLevels = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    return new Promise((resolve, reject) => {

        LevelsRquest.find({}, (errFind, levels) => {


            if (errFind) {
                reject(errFind)
            } else if (levels.length <= 0) {
                reject("there are no Levels") 
            } else {


                resolve(levels)

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
const createLevel = (name, Level, department, position) => {

    return new Promise((resolve, reject) => { // check email

                // inser a new Level
                LevelsRquest.create({
                    name, Level, department, position
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
const editLevel = (id, name, Level, department, position) => {
    return new Promise((resolve, reject) => { // update Level
        // check id
        LevelsRquest.findOne({}, (errFind, Level) => {

            if (errFind) {
                reject(errFind)
            } else if (!Level) {
                reject("id not exist")
            }else {

                LevelsRquest.updateOne({}, {
                    name, Level, department, position , updatedAt: Date.now() 
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
