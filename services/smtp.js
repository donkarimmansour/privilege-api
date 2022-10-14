const SmtpRquest = require("../models/Smtp")

// get Smtp
const getSmtp = () => {

    return new Promise((resolve, reject) => {

        SmtpRquest.findOne({}, (errFind, smtp) => { 

            if (errFind) {
                reject(errFind)
            } else if (!smtp) {
                reject("there is no Smtp")
            } else {
                resolve(smtp)
            }

        })

    })
}


// edit Smtp
const editSmtp = (id, data) => {
    return new Promise((resolve, reject) => { // update Smtp

                SmtpsRquest.updateOne({}, {
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


    })
}




module.exports = { getSmtp, editSmtp  }
