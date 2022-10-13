const GroupModel = require("../services/group")
const codes = require("../common/codes") 

 
// get All Groups
const getAllGroups = (req, res) => {
    const { sort, limit, skip, filter, select, expend } = req.query;

    GroupModel.getAllGroups(sort, limit, skip, filter, select, expend).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// get All Groups Count
const getAllGroupsCount = (req, res) => {
    const { filter } = req.query;

    GroupModel.getAllGroupsCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// create Group
const createGroup = (req, res) => {
    const {title, className} = req.body;

    GroupModel.createGroup(title, className).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Groups
const editGroup = (req, res) => {
    const { title, className} = req.body;
    const { id } = req.params;

    GroupModel.editGroup(id , title, className).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// delete Group
const deleteGroup = (req, res) => {
    const { id } = req.params;

    GroupModel.deleteGroup(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllGroups, getAllGroupsCount, createGroup, editGroup, deleteGroup }
