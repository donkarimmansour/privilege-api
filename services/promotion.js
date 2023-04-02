const PromotionsRquest = require("../models/promotion")

// get All Promotions
const getAllPromotions = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    return new Promise((resolve, reject) => {

        PromotionsRquest.find({}, (errFind, promotions) => {


            if (errFind) {
                reject(errFind)
            } else if (promotions.length <= 0) {
                reject("there are no Promotions")
            } else {


                resolve(promotions)

            }


        }).populate(expend)
        .select(select)
        .sort(JSON.parse(sort))
        .limit(parseInt(limit))
        .skip(parseInt(skip)) 
        .setQuery({ ...JSON.parse(filter) })


    })
}


// get All Promotion Count
const getAllPromotionsCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        PromotionsRquest.find({}, (errFind, Promotions) => {

            if (errFind) {
                reject(errFind)
            } else if (Promotions.length <= 0) {
                reject("there are no Promotions")
            } else {


                resolve(Promotions)

            }


        }).count({ ...JSON.parse(filter) })

    })
}

// create Promotion
const createPromotion = (name, description , language, session, actions) => {

    return new Promise((resolve, reject) => {

                // insert Promotions
                PromotionsRquest.create({ name, description , language, session, actions: [actions] }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                    } else {
                                                
                        resolve(res._id)
                    }
                })


    })
}


// edit Promotion
const editPromotion = (id, name, description , language, session, actions) => {
    return new Promise((resolve, reject) => { // update Promotion
        // check id
        PromotionsRquest.findOne({}, (errFind, promotion) => {

            if (errFind) {
                reject(errFind)
            } else if (!promotion) {
                reject("id not exist")
            }else {

                PromotionsRquest.updateOne({}, {
                    name, description , language, session , $push: {actions},
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


// delete Promotion
const deletePromotion = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        PromotionsRquest.findOne({}, (errFind, promotions) => {

            if (errFind) {
                reject(errFind)
            } else if (!promotions) {
                reject("id not exist")
            } else {

                //delete
                PromotionsRquest.deleteOne({}, (errUpdate, doc) => {

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


module.exports = { getAllPromotions, createPromotion, deletePromotion, getAllPromotionsCount,editPromotion }
