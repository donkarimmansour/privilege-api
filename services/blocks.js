const BlocksRquest = require("../models/blocks")

// get All Blocks
const getAllBlocks = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    return new Promise((resolve, reject) => {

        BlocksRquest.find({}, (errFind, blocks) => {


            if (errFind) {
                reject(errFind)
            } else if (blocks.length <= 0) {
                reject("there are no Blocks")
            } else {


                resolve(blocks)

            }


        }).populate(expend)
        .select(select)
        .sort(JSON.parse(sort))
        .limit(parseInt(limit))
        .skip(parseInt(skip)) 
        .setQuery({ ...JSON.parse(filter) })


    })
}


// get All Block Count
const getAllBlocksCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        BlocksRquest.find({}, (errFind, blocks) => {

            if (errFind) {
                reject(errFind)
            } else if (blocks.length <= 0) {
                reject("there are no Blocks")
            } else {


                resolve(blocks)

            }


        }).count({ ...JSON.parse(filter) })

    })
}

// create Block
const createBlock = (studentID, description, actions) => {

    return new Promise((resolve, reject) => {

                // insert Blocks
                BlocksRquest.create({ studentID, description, actions: [actions] }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                    } else {
                                                
                        resolve(res._id)
                    }
                })


    })
}


// edit Block
const editBlock = (id, studentID, description, actions) => {
    return new Promise((resolve, reject) => { // update Block
        // check id
        BlocksRquest.findOne({}, (errFind, Block) => {

            if (errFind) {
                reject(errFind)
            } else if (!Block) {
                reject("id not exist")
            }else {

                BlocksRquest.updateOne({}, {
                    studentID, description , $push: {actions},
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


// delete Block
const deleteBlock = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        BlocksRquest.findOne({}, (errFind, blocks) => {

            if (errFind) {
                reject(errFind)
            } else if (!blocks) {
                reject("id not exist")
            } else {

                //delete
                BlocksRquest.deleteOne({}, (errUpdate, doc) => {

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


module.exports = { getAllBlocks, createBlock, deleteBlock, getAllBlocksCount,editBlock }
