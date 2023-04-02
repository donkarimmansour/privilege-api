const PaymentsRquest = require("../models/payment")
const BillsRquest = require("../models/bill")
const BooksRquest = require("../models/book")

// get All Payments
const getAllPayments = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    const newExpend = expend === "all" ? [{ path: 'studentID', model: 'student', populate: { path: 'language', model: 'language' } }] : expend

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
const createPayment = (studentID, paymentMethod, paymentReference, paymentDetails, feesType, amount, book, actions) => {

    return new Promise((resolve, reject) => {
        

        if(feesType === "language"){
            BillsRquest.findOne({ studentID }, (errFind, bill) => {
                if (errFind) {
                    reject(errFind)
                } else if (!bill) {
                    reject("there is no Bill")
                } else {

            

                    if (amount < bill.amount) {
                        bill.amount -= amount
                        bill.actions = [...bill.actions, {...actions, action: "edit"}]                    
                        bill.save()
    
                        // inser a new Payment
                        PaymentsRquest.create({
                            studentID, paymentMethod, paymentReference, paymentDetails, feesType, amount, actions: [actions]
                        }, (errInsert, res) => {
                            if (errInsert) {
                                reject(errInsert)
                            } else {
                                resolve(res._id)
                            }
    
                        })
    
    
                    } else if (amount == bill.amount) {
    
                        BillsRquest.deleteOne({ studentID }, (errUpdate, doc) => {
                            if (errUpdate) {
                                reject(errUpdate)
                            } else if (doc.deletedCount > 0) {
    
    
                                // inser a new Payment
                                PaymentsRquest.create({
                                    studentID, paymentMethod, paymentReference, paymentDetails, feesType, amount, actions: [actions]
                                }, (errInsert, res) => {
                                    if (errInsert) {
                                        reject(errInsert)
                                    } else {
                                        resolve(res._id)
                                    }
    
                                })
    
    
                            } else {
                                reject("something went wrong")
                            }
                        })
                    } else {
                        reject("amount can't be greater then bill cost")
                    }
                }
            })
        }else{



            BooksRquest.findById(book, (errFind, books) => {
                if (errFind) {
                    reject(errFind)
                } else if (!books) {
                    reject("there are no Books")
                } else {

                    if(books.quantity > 0){

                        books.quantity -= 1
                        books.actions = [...books.actions, { ...actions, action: "edit" }]
                        books.save()
 
                        // inser a new Payment
                        PaymentsRquest.create({
                            studentID, paymentMethod, paymentReference, paymentDetails, feesType, amount, actions: [actions]
                        }, (errInsert, res) => {
                            if (errInsert) {
                                reject(errInsert)
                            } else {
                                resolve(res._id)
                            }
                        })

                    }else{
                        reject("there are no Books")
                    }

                }

            })
        }

    })
}

// edit Payment
const editPayment = (id, studentID, paymentMethod, paymentReference, paymentDetails, feesType, amount, actions) => {
    return new Promise((resolve, reject) => { // update Payment

        // PaymentsRquest.updateOne({}, {
        //     studentID, paymentMethod, paymentReference, paymentDetails, feesType, amount, $push: {actions} ,
        //     updatedAt: Date.now()
        // }, (errUpdate, doc) => {
        //     if (errUpdate) {
        //         reject(errUpdate) 
        //         return
        //     } 

        //     if (doc.modifiedCount > 0) {
        //         resolve("modified")


        //     } else {
        //         reject("something went wrong")

        //     }

        // }).where("_id").equals(id)
    })
}



// delete Payment
const deletePayment = (id) => {

    return new Promise((resolve, reject) => {

        // // check id
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


module.exports = { getAllPayments, getAllPaymentsCount, createPayment, editPayment, deletePayment }
