const NotificationControlles = require("../controlles/notification")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { NotificationValidator  } = require("../middlewares/validators")

// getall Notification
router.get(ApiEndpoints.Notifications.list , passport.authenticate("studentOradminOrsuperAdmin", {session: false}) ,  NotificationControlles.getAllNotifications ,  handleError)
 
// count Notifications
router.get(ApiEndpoints.Notifications.count , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  NotificationControlles.getAllNotificationsCount , handleError)

// create Notification 
router.post(ApiEndpoints.Notifications.create,passport.authenticate("adminOrsuperAdmin", {session: false})  ,  NotificationValidator, HandleValidatorError , NotificationControlles.createNotification , handleError)

// seen Notification
router.put(ApiEndpoints.Notifications.seen , passport.authenticate("student", {session: false}), idValidator , NotificationControlles.seenNotification , handleError)

// delete Notification
router.delete(ApiEndpoints.Notifications.delete , passport.authenticate("studentOrsuperAdmin", {session: false}), idValidator , NotificationControlles.deleteNotification , handleError)


module.exports = router