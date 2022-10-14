const NotificationModel = require("../services/notification")
const codes = require("../common/codes")

 
// get All Notifications
const getAllNotifications = (req, res) => {
    const { sort, limit, skip, filter, select } = req.query;

    NotificationModel.getAllNotifications(sort, limit, skip, filter, select).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// create Notification
const createNotification = (req, res) => {
    const { data} = req.body;

    NotificationModel.createNotification( data).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Notifications
const editNotification = (req, res) => {
    const {  data} = req.body;
    const { id } = req.params;

    NotificationModel.editNotification(id,  data).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



// delete Notification
const deleteNotification = (req, res) => {
    const { id } = req.params;

    NotificationModel.deleteNotification(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllNotifications, createNotification, editNotification, deleteNotification }
