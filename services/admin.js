const AdminsRquest = require("../models/admin")

// get All Admins
const getAllAdmins = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"username" : { "$ne": "x" }}', select = null, expend = null) => {

    
    return new Promise((resolve, reject) => {

        AdminsRquest.find({}, (errFind, Admins) => {

            if (errFind) {
                reject(errFind)
            } else if (Admins.length <= 0) {
                reject("there are no Admins")
            } else {

               
                resolve(Admins)

            }


        }).populate(expend)
        .select(select)
        .sort(JSON.parse(sort))
        .limit(parseInt(limit))
        .skip(parseInt(skip)) 
        .setQuery({ ...JSON.parse(filter) })


    })
}






// get All Admins Count
const getAllAdminsCount = (filter = '{"username" : { "$ne": "x" }}') => {

    return new Promise((resolve, reject) => {

        AdminsRquest.find({}, (errFind, Admins) => {

            if (errFind) {
                reject(errFind)
            } else if (Admins.length <= 0) {
                reject("there are no Admins")
            } else {


                resolve(Admins)

            }


        }).count({ ...JSON.parse(filter) })

    })
}

// create Admin
const createAdmin = (firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin , role , isAccountActivated , image) => {

    return new Promise((resolve, reject) => { // check email
        AdminsRquest.findOne({}, (errFind, Admin) => {

            if (errFind) {
                reject(errFind)
            } else if (Admin) {
                reject("the email or username already exists")
            } else {
                // inser a new Admin
                AdminsRquest.create({
                    firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin , role , 
                    password: new AdminsRquest().hashPassword(password), image , isAccountActivated

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

// edit Admin
const editAdmin = (id,firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin , role , isAccountActivated) => {
    return new Promise((resolve, reject) => { // update Admin
        // check id
        AdminsRquest.findOne({}, (errFind, Admin) => {

            if (errFind) {
                reject(errFind)
            } else if (!Admin) {
                reject("id not exist")
            } 
            
            // else if (Admin.username === username || Admin.email === email) {
            //     reject("the email or username already exists")
            // } 
            
            else {




                //update
                const newpassword = (password == "") ? Admin.password : Admin.hashPassword(password)

                AdminsRquest.updateOne({}, {
                    password: newpassword ,
                    firstname, lastname, gender, phone, birthday, username, email, facebook, twitter, linkedin , role , 
                    updatedAt: Date.now() , isAccountActivated
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


// edit Admin Profile
const editAdminProfile = (id, firstname, lastname, phone, email, password, facebook, twitter, linkedin) => {
    return new Promise((resolve, reject) => { // update Admin
        // check id
        AdminsRquest.findOne({}, (errFind, Admin) => {


            if (errFind) {
                reject(errFind)
            } else if (!Admin) {
                reject("id not exist")
            } 
            
            // else if (Admin.email === email) {
            //     reject("the email already exists")
            // }
            
            else {


                //update
                const newpassword = (password == "") ? Admin.password : Admin.hashPassword(password)

                AdminsRquest.updateOne({}, {
                    password: newpassword,
                    firstname, lastname, phone, email, facebook, twitter, linkedin,
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

            }

        }).where("_id").equals(id)



    })
}


// edit Admin Image
const editAdminImage = (id, image) => {
    return new Promise((resolve, reject) => { // update user
        // check id
        AdminsRquest.findOneAndUpdate({}, { image, updatedAt: Date.now() }, (errFind, Admin) => {
            if (errFind) {
                reject(errFind)
            } else if (!Admin) {
                reject("id not exist")
            } else {

                //update
                resolve(Admin.image)

            }

        }).where("_id").equals(id)



    })
}


// delete Admin
const deleteAdmin = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        AdminsRquest.findOne({}, (errFind, Admin) => {

            if (errFind) {
                reject(errFind)
            } else if (!Admin) {
                reject("id not exist")
            } else {

                //delete
                AdminsRquest.deleteOne({}
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


module.exports = { getAllAdmins, getAllAdminsCount, createAdmin, editAdmin, editAdminProfile, editAdminImage, deleteAdmin  }
