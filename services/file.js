const fs = require("fs")
const fileRquest = require("../models/file")


//create Single File
const createSingleFile = (file) => {

    return new Promise((resolve, reject) => { 

            fileRquest.create({
               file
            }, (errCreate, doc) => { 
                if (errCreate) {

                    if (fs.existsSync("./public/images/" + file)) {
                         fs.unlink("./public/images/" + file, () => { })
                    }

                    reject(errCreate)
                    return
                }

                resolve(doc["_id"])
            })
                
    })
}




//get Single File
const getSingleFile = (id) => {

    return new Promise((resolve, reject) => { 

            fileRquest.findById( id , (errFind, img) => {

                if (errFind) {
                    reject(errFind)
                    return
                }
    
                if (!img) {
                    reject("id not exist")
                    return
                }
    
                resolve(img)

            })
                
    })
}


module.exports = {
    createSingleFile  ,    getSingleFile
 }
