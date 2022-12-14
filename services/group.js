const GroupsRquest = require("../models/group")

// get All Groups
const getAllGroups = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    const newExpend = expend === "all" ? [{path: 'className', model: 'course'}] : expend

    return new Promise((resolve, reject) => {

        GroupsRquest.find({}, (errFind, groups) => {


            if (errFind) {
                reject(errFind)
            } else if (groups.length <= 0) {
                reject("there are no Groups")
            } else {


                resolve(groups)

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

// get All Groups Count
const getAllGroupsCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        GroupsRquest.find({}, (errFind, groups) => {

            if (errFind) {
                reject(errFind)
            } else if (groups.length <= 0) {
                reject("there are no Groups")
            } else {


                resolve(groups)

            }


        }).count({ ...JSON.parse(filter) })

    }) 
}

// create Group
const createGroup = (name, className) => {

    return new Promise((resolve, reject) => { // check email

                // inser a new Group
                GroupsRquest.create({
                    name, className

                }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                        return
                    }


                    resolve(res._id)


                })
    })
}

// edit Group
const editGroup = (id, name, className) => {
    return new Promise((resolve, reject) => { // update Group

 
                GroupsRquest.updateOne({}, {
                    name, className , updatedAt: Date.now() 
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



// delete Group
const deleteGroup = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        GroupsRquest.findOne({}, (errFind, group) => {

            if (errFind) {
                reject(errFind)
            } else if (!group) {
                reject("id not exist")
            } else {

                //delete
                GroupsRquest.deleteOne({}
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


module.exports = { getAllGroups, getAllGroupsCount, createGroup, editGroup , deleteGroup  }
