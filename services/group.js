const GroupsRquest = require("../models/group")

// get All Groups
const getAllGroups = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

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
            .populate(expend)
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
const createGroup = (title, className) => {

    return new Promise((resolve, reject) => { // check email
        GroupsRquest.findOne({}, (errFind, Group) => {

            if (errFind) {
                reject(errFind)
            } else if (Group) {
                reject("the email or username already exists")
            } else {
                // inser a new Group
                GroupsRquest.create({
                    title, className

                }, (errInsert, res) => {
                    if (errInsert) {
                        reject(errInsert)
                        return
                    }


                    resolve(res._id)


                })
            }



        }).or([{ email }, { username }])
    })
}

// edit Group
const editGroup = (id, title, className) => {
    return new Promise((resolve, reject) => { // update Group

 
                GroupsRquest.updateOne({}, {
                    title, className , updatedAt: Date.now() 
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
