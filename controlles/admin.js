const AdminModel = require("../services/admin")
const codes = require("../common/codes")


// get All Admins
const getAllAdmins = (req, res) => {
    const { sort, limit, skip, filter, select, expend } = req.query;

    AdminModel.getAllAdmins(sort, limit, skip, filter, select, expend).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// get All Admins Count
const getAllAdminsCount = (req, res) => {
    const { filter } = req.query;

    AdminModel.getAllAdminsCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// create Admin
const createAdmin = (req, res) => {
    const {firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin , role , isAccountActivated , image} = req.body;

    AdminModel.createAdmin(firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin , role , isAccountActivated , image).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Admins
const editAdmin = (req, res) => {
    const { firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin , role , isAccountActivated} = req.body;
    const { id } = req.params;

    AdminModel.editAdmin(id, firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin , role , isAccountActivated).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Admin Profile
const editAdminProfile = (req, res) => {
    const { firstname, lastname, phone, email, password, facebook, twitter, linkedin  } = req.body;
    const { id } = req.params;

    AdminModel.editAdminProfile(id, firstname, lastname, phone, email, password, facebook, twitter, linkedin).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// edit Admin Image
const editAdminImage = (req, res) => {
    const { image } = req.body;
    const { id } = req.params;

    AdminModel.editAdminImage(id, image).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// delete Admin
const deleteAdmin = (req, res) => {
    const { id } = req.params;

    AdminModel.deleteAdmin(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllAdmins, getAllAdminsCount, createAdmin, editAdmin, editAdminProfile, editAdminImage, deleteAdmin }
