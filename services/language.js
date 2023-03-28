const LanguagesRquest = require("../models/language")

// get All Languages
const getAllLanguages = (sort, limit, skip, filter) => {

        return new Promise((resolve, reject) => { 

            LanguagesRquest.aggregate([
                { $lookup: { from: `students`, localField: `_id`, foreignField: "language", as: `studentsCount` } },
                { $lookup: { from: `teachers`, localField: `_id`, foreignField: "teach", as: `teachersCount` } },
                { $addFields: { studentsCount: { $size: "$studentsCount" } } },
                { $addFields: { teachersCount: { $size: "$teachersCount" } } },
                {
                    $project: {
                        studentsCount: 1, teachersCount: 1, name: 1, description: 1, image: 1, createdAt: 1, updatedAt: 1,
                        session: 1, actions: 1, _id: { $toString: "$_id" }
                    }
                },
                { $match: filter ? JSON.parse(filter) : {} },
                { $skip: skip ? parseInt(skip) : 0 },
                { $limit: limit ? parseInt(limit) : 1000 },
                { $sort: sort ? JSON.parse(sort) : { "_id": 1 } },
            ]).exec().then(languages => {
    
                if (languages.length <= 0) {
                    reject("there are no Languages")
                    return
                }
    
                resolve(languages)
    
            }).catch(err => { reject(err) })
    


    })
}


// get All Languages Count
const getAllLanguagesCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        LanguagesRquest.find({}, (errFind, languages) => {

            if (errFind) {
                reject(errFind)
            } else if (languages.length <= 0) {
                reject("there are no Languages")
            } else {


                resolve(languages)

            }


        }).count({ ...JSON.parse(filter) })

    })
}

// create Language
const createLanguage = (name , description , session, actions) => {

    return new Promise((resolve, reject) => { // check email
                // inser a new Language
                LanguagesRquest.create({
                    name , description , session, actions: [actions]
                }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                        return
                    }
 

                    resolve(res._id)


                })
    })
}

// edit Language
const editLanguage = (id, name , description , session, actions) => {
    return new Promise((resolve, reject) => { // update Language
        // check id
        LanguagesRquest.findOne({}, (errFind, language) => {

            if (errFind) {
                reject(errFind)
            } else if (!language) {
                reject("id not exist")
            }else {


                LanguagesRquest.updateOne({}, {
                    name , description , session, $push: { actions } , updatedAt: Date.now() 
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


// // edit Language Image
// const editLanguageImage = (id, image) => {
//     return new Promise((resolve, reject) => { // update user
//         // check id
//         LanguagesRquest.findOneAndUpdate({}, { image, updatedAt: Date.now() }, (errFind, Language) => {
//             if (errFind) {
//                 reject(errFind)
//             } else if (!Language) {
//                 reject("id not exist")
//             } else {

//                 //update
//                 resolve(Language.image)

//             }

//         }).where("_id").equals(id)



//     })
// }


// delete Language
const deleteLanguage = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        LanguagesRquest.findOne({}, (errFind, language) => {

            if (errFind) {
                reject(errFind)
            } else if (!language) {
                reject("id not exist")
            } else {

                //delete
                LanguagesRquest.deleteOne({}
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
 
 
module.exports = { getAllLanguages, getAllLanguagesCount, createLanguage, editLanguage, deleteLanguage }
