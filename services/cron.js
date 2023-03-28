const cron = require('node-cron')
const StudentsRquest = require("../models/student")
const GroupsRquest = require("../models/group")
const moment = require("moment")


cron.schedule('0 0 20 * * 5', () => {
    console.log('running a task every minute')

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
                        const todayHalfhourse = g.calindar.filter(d => d.day == todayName).length

                        StudentsRquest.updateMany({ group: g._id, hours: { $gt: 0 } },
                            { $inc: { hours: - (todayHalfhourse / 2) }, updatedAt: Date.now() },
                            () => {
                                step++
                                console.log("step => ", step)
                                resolve(handleUpdater(groups[step]))
                            })
                    }
                })

            }

             await handleUpdater(groups[0])


        }//else if

    })

})