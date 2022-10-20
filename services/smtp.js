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
const editSmtp = (id, host , username , port , email , name , security , password) => {
    return new Promise((resolve, reject) => { // update Smtp

           SmtpRquest.updateOne({}, {
                    host , username , port , email , name , security , password ,
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
