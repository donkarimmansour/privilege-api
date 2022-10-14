const NotificationsRquest = require("../models/notification")

// get All Notifications
const getAllNotifications = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null) => {

    return new Promise((resolve, reject) => {

        NotificationsRquest.find({}, (errFind, notifications) => { 


            if (errFind) {
                reject(errFind)
            } else if (notifications.length <= 0) {
                reject("there are no notifications")
            } else {
 

                resolve(notifications)

            }


        })
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })


    })
}



// create Notification
const createNotification = (data) => {

    return new Promise((resolve, reject) => { // check email

                // inser a new Notification
                NotificationsRquest.create({
                    data
                }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                        return
                    }
                    resolve(res._id)

                })
    })
}

// edit Notification
const editNotification = (id, data) => {
    return new Promise((resolve, reject) => { // update Notification
        // check id
        NotificationsRquest.findOne({}, (errFind, notification) => {

            if (errFind) {
                reject(errFind)
            } else if (!notification) {
                reject("id not exist")
            }else {

                NotificationsRquest.updateOne({}, {
                    data ,
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



// delete Notification
const deleteNotification = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        NotificationsRquest.findOne({}, (errFind, notification) => {

            if (errFind) {
                reject(errFind)
            } else if (!notification) {
                reject("id not exist")
            } else {

                //delete
                NotificationsRquest.deleteOne({}
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


module.exports = { getAllNotifications, createNotification, editNotification, deleteNotification  }
