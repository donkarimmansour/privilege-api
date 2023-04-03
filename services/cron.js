const cron = require('node-cron')
const StudentsRquest = require("../models/student")
const GroupsRquest = require("../models/group")
const CancelationsRquest = require("../models/cancelation")
const moment = require("moment")

 
cron.schedule('0 0 20 * * 5', () => {
    console.log('running a task every day')

    GroupsRquest.find({}, async (errFind, groups) => {

        if (errFind) {
            console.log(errFind)
        } else if (groups.length > 0) {
 
            let step = 0
            const todayName = moment().format("dddd")

            const handleUpdater = g => {
                return new Promise((resolve) => {

                    if (step >= groups.length) {
                        resolve()
                    } else {

                        CancelationsRquest.findOne({day: todayName, group: g._id}, async (errFind, cancelations) => {

                            if (errFind) {
                                console.log(errFind)
                            } else if (!cancelations) {
                                console.log("cancel : ", g.name)             

                                step++
                                console.log("step => ", step)
                                resolve(handleUpdater(groups[step]))
                            }else{
                                console.log("minus : ", g.name)

                                const todayHalfhourse = g.calindar.filter(d => d.day == todayName).length

                                if (todayHalfhourse !== 0) {
                                    StudentsRquest.updateMany({ group: g._id, hours: { $gt: 0 } },
                                        { $inc: { hours: - (todayHalfhourse / 2) }, updatedAt: Date.now() },
                                        () => {
                                            step++
                                            console.log("step => ", step, " today Half hourse : ", todayHalfhourse)
                                            resolve(handleUpdater(groups[step]))
                                        })
                                }else{
                                    step++
                                    console.log("step => ", step)
                                    resolve(handleUpdater(groups[step]))
                                }//if

                            }
                        })//CancelationsRquest

                    }
                })//Promise

            }//handleUpdater

             await handleUpdater(groups[0])


        }//else if

    })

})