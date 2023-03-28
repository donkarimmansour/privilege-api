const NotificationModel = require("../services/notification")
const codes = require("../common/codes")

 
// get All Notifications
const getAllNotifications = (req, res) => {
    const { sort, limit, skip, filter, select, expend } = req.query;
 
    NotificationModel.getAllNotifications(sort, limit, skip, filter, select, expend).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// get All Notifications Count
const getAllNotificationsCount = (req, res) => {
    const { filter } = req.query;

    NotificationModel.getAllNotificationsCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



// create Notification
const createNotification = (req, res) => {
    const { message, listIds, title , actions} = req.body;

    NotificationModel.createNotification(message, listIds, title , actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// seen Notification
const seenNotification = (req, res) => {
    const { actions} = req.body;
    const { id } = req.params;

    NotificationModel.seenNotification(id, actions).then(result => {
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



module.exports = { getAllNotifications, createNotification, deleteNotification, seenNotification, getAllNotificationsCount }
