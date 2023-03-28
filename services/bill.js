const BillsRquest = require("../models/bill")

// get All Bills
const getAllBills = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    return new Promise((resolve, reject) => {
 
        BillsRquest.find({}, (errFind, bills) => {

            if (errFind) {
                reject(errFind)
            } else if (bills.length <= 0) {
                reject("there are no Bills")
            } else { 


                resolve(bills)

            }


        }).populate(expend)
        .select(select)
        .sort(JSON.parse(sort))
        .limit(parseInt(limit))
        .skip(parseInt(skip)) 
        .setQuery({ ...JSON.parse(filter) })


    })
}


// get All Bills Count
const getAllBillsCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        BillsRquest.find({}, (errFind, Bills) => {

            if (errFind) {
                reject(errFind)
            } else if (Bills.length <= 0) {
                reject("there are no Bills")
            } else {


                resolve(Bills)

            }


        }).count({ ...JSON.parse(filter) })

    })
}


// create Bill
const createBill = (studentID, amount, actions) => {

    return new Promise((resolve, reject) => { 

        // // insert Bills
        // BillsRquest.create({
        //     studentID, amount, actions: [actions]
        // }, (errInsert, res) => {
        //     if (errInsert) {
        //         reject(errInsert)
        //     } else {
        //         resolve(res._id)

        //     }

        // })
    })
}

// edit Bill
const editBill = (id, _studentID, amount, actions) => {
    return new Promise((resolve, reject) => { // update Bill
        // // check id
        // BillsRquest.findOne({}, (errFind, Bill) => {

        //     if (errFind) {
        //         reject(errFind)
        //     } else if (!Bill) {
        //         reject("id not exist")
        //     }else {

        //         BillsRquest.updateOne({}, {
        //             amount, $push : { actions } , updatedAt: Date.now() 
        //         }, (errUpdate, doc) => {

        //             if (errUpdate) {
        //                 reject(errUpdate)
        //             }else if (doc.modifiedCount > 0) {
        //                 resolve("modified")


        //             } else {
        //                 reject("something went wrong")

        //             }

        //         }).where("_id").equals(id)

        //     }

        // }).where("_id").equals(id)



    })
}

const deleteBill = (id) => {

    return new Promise((resolve, reject) => {

        // // check id
        // BillsRquest.findOne({}, (errFind, bill) => {

        //     if (errFind) {
        //         reject(errFind)
        //     } else if (!bill) {
        //         reject("id not exist")
        //     } else {

        //         //delete
        //         BillsRquest.deleteOne({}, (errUpdate, doc) => {

        //                 if (errUpdate) {
        //                     reject(errUpdate)
        //                 }else if (doc.deletedCount > 0) {
        //                     resolve("deleted")

        //                 } else {
        //                     reject("something went wrong")
        //                 }

        //             }).where("_id").equals(id)
        //     }//else
        // }).where("_id").equals(id)

    })
}


module.exports = { getAllBills, createBill, deleteBill, editBill, getAllBillsCount }
