const PaymentsRquest = require("../models/payment")
const BillsRquest = require("../models/bill")
const BooksRquest = require("../models/book")

const checkDateFilter = (filter) => {
    if (!filter) {
        return {}
    } else {
        let newFilter = JSON.parse(filter)

        console.log(newFilter)

        if(newFilter.updatedAt){
            if (newFilter.updatedAt["$gte"]) {
                newFilter.updatedAt["$gte"] = new Date(newFilter.updatedAt["$gte"])
            } else if (newFilter.updatedAt["$lte"]) {
                newFilter.updatedAt["$lte"] = new Date(newFilter.updatedAt["$lte"])
            }
        }

        return newFilter
    }
}


// get All Payments
const getAllPayments = (sort, limit, skip, filter) => {

    return new Promise((resolve, reject) => {
        
        PaymentsRquest.aggregate([
            { $lookup: { from: `students`, localField: "studentID", foreignField: "_id", as: `studentID` } },
            { $addFields: { studentID: { $first: "$studentID" }, lastname: {$first: "$studentID.lastname"}, firstname: {$first: "$studentID.firstname"}, _id: { $toString: "$_id" } } },
            { $match: checkDateFilter(filter) },
            { $skip: skip ? parseInt(skip) : 0 },
            { $limit: limit ? parseInt(limit) : 1000 },
            { $sort: sort ? JSON.parse(sort) : { "_id": 1 } }
        ]).exec().then(payments => {

            if (payments.length <= 0) {
                reject("there are no Payments")
                return
            }

            resolve(payments)
        
        }).catch(err => { reject(err) })


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
                PaymentsRquest.updateOne({},{status: "archived"}, (errUpdate, doc) => {
                        if (errUpdate) {
                            reject(errUpdate)
                            
                        }else if (doc.modifiedCount > 0) {
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
