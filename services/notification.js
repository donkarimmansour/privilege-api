const NotificationsRquest = require("../models/notification")

// get All Notifications
const getAllNotifications = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    return new Promise((resolve, reject) => {

        NotificationsRquest.find({}, (errFind, notifications) => {


            if (errFind) {
                reject(errFind)
            } else if (notifications.length <= 0) {
                reject("there are no notifications")
            } else {


                resolve(notifications)

            }


        }).populate(expend)
        .select(select)
        .sort(JSON.parse(sort))
        .limit(parseInt(limit))
        .skip(parseInt(skip)) 
        .setQuery({ ...JSON.parse(filter) })


    })
}


// get All Notification Count
const getAllNotificationsCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        NotificationsRquest.find({}, (errFind, Notifications) => {

            if (errFind) {
                reject(errFind)
            } else if (Notifications.length <= 0) {
                reject("there are no Notifications")
            } else {


                resolve(Notifications)

            }


        }).count({ ...JSON.parse(filter) })

    })
}

// create Notification
const createNotification = (message, listIds, title , actions) => {

    return new Promise((resolve, reject) => { // check email

               const list = listIds.map(l => ({ message, title, actions: [actions], studentID: l.id, firstname: l.firstname, lastname: l.lastname }))

                // insert Notifications
                NotificationsRquest.create(list, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                    } else {
                                                
                        resolve(list.map((n, i) => res.find(r => n.studentID == r.studentID ) ? ({id: res[i]._id, firstname: n.firstname, lastname: n.lastname}) : null).filter(n => !!n))
                    }
                })


    })
}


// seen Notification
const seenNotification = (id, actions) => {
    return new Promise((resolve, reject) => { // update Notification
        // check id
        NotificationsRquest.findOne({}, (errFind, notification) => {

            if (errFind) {
                reject(errFind)
            } else if (!notification) {
                reject("id not exist")
            }else {

                NotificationsRquest.updateOne({}, {
                    seen: true,
                    $push : { actions },
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
                NotificationsRquest.deleteOne({}, (errUpdate, doc) => {

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


module.exports = { getAllNotifications, createNotification, deleteNotification, seenNotification, getAllNotificationsCount }
