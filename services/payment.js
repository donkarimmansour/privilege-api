const PaymentsRquest = require("../models/payment")

// get All Payments
const getAllPayments = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    const newExpend = expend === "all" ? [{ path: 'studentID', model: 'student' , populate : {path : 'className', model: 'course'}}] : expend

    return new Promise((resolve, reject) => {

        PaymentsRquest.find({}, (errFind, payments) => {


            if (errFind) {
                reject(errFind)
            } else if (payments.length <= 0) {
                reject("there are no Payments")
            } else {


                resolve(payments)

            }


        })
            .populate(newExpend)
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })


    })
}

// get All Payments Count
const getAllPaymentsCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        PaymentsRquest.find({}, (errFind, payments) => {

            if (errFind) {
                reject(errFind)
            } else if (payments.length <= 0) {
                reject("there are no Payments")
            } else {


                resolve(payments)

            }


        }).count({ ...JSON.parse(filter) })

    })
}

// create Payment
const createPayment = (studentID, paymentStatus, paymentMethod, paymentDuration, paymentReference, paymentDetails, feesType, pending, amount) => {

    return new Promise((resolve, reject) => { 

                // inser a new Payment
                PaymentsRquest.create({
                    studentID, paymentStatus, paymentMethod, paymentDuration, paymentReference, paymentDetails, feesType, pending, amount

                }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                        return
                    }


                    resolve(res._id)


                })

    })
}

// edit Payment
const editPayment = (id, studentID, paymentStatus, paymentMethod, paymentDuration, paymentReference, paymentDetails, feesType, pending, amount) => {
    return new Promise((resolve, reject) => { // update Payment

                PaymentsRquest.updateOne({}, {
                    studentID, paymentStatus, paymentMethod, paymentDuration, paymentReference, paymentDetails, feesType, pending, amount ,
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
    })
}



// delete Payment
const deletePayment = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        PaymentsRquest.findOne({}, (errFind, payment) => {

            if (errFind) {
                reject(errFind)
            } else if (!payment) {
                reject("id not exist")
            } else {

                //delete
                PaymentsRquest.deleteOne({}
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


module.exports = { getAllPayments, getAllPaymentsCount, createPayment, editPayment, deletePayment  }
