const CancelationsRquest = require("../models/cancelation")

// get All Cancelations
const getAllCancelations = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    return new Promise((resolve, reject) => {

        CancelationsRquest.find({}, (errFind, cancelations) => {


            if (errFind) {
                reject(errFind)
            } else if (cancelations.length <= 0) {
                reject("there are no Cancelations")
            } else {


                resolve(cancelations)

            }


        }).populate(expend)
        .select(select)
        .sort(JSON.parse(sort))
        .limit(parseInt(limit))
        .skip(parseInt(skip)) 
        .setQuery({ ...JSON.parse(filter) })


    })
}


// get All Cancelation Count
const getAllCancelationsCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        CancelationsRquest.find({}, (errFind, cancelations) => {

            if (errFind) {
                reject(errFind)
            } else if (cancelations.length <= 0) {
                reject("there are no Cancelations")
            } else {


                resolve(cancelations)

            }


        }).count({ ...JSON.parse(filter) })

    })
}

// create Cancelation
const createCancelation = (name, description, day , group, actions) => {

    return new Promise((resolve, reject) => {

                // insert Cancelations
                CancelationsRquest.create({ name, description, day , group, actions: [actions] }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                    } else {
                                                
                        resolve(res._id)
                    }
                })


    })
}




// edit Cancelation
const editCancelation = (id, name, description, day , group, actions) => {
    return new Promise((resolve, reject) => { // update Cancelation
        // check id
        CancelationsRquest.findOne({}, (errFind, cancelation) => {

            if (errFind) {
                reject(errFind)
            } else if (!cancelation) {
                reject("id not exist")
            }else {

                CancelationsRquest.updateOne({}, {
                    name, description, day , group , $push: {actions},
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


// delete Cancelation
const deleteCancelation = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        CancelationsRquest.findOne({}, (errFind, Cancelation) => {

            if (errFind) {
                reject(errFind)
            } else if (!Cancelation) {
                reject("id not exist")
            } else {

                //delete
                CancelationsRquest.deleteOne({}, (errUpdate, doc) => {

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


module.exports = { getAllCancelations, createCancelation, deleteCancelation, getAllCancelationsCount, editCancelation }
