const TeacherModel = require("../services/teacher")
const codes = require("../common/codes")
 
 
// get All Teachers
const getAllTeachers = (req, res) => {
    const { sort, limit, skip, filter } = req.query;

    TeacherModel.getAllTeachers(sort, limit, skip, filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// get All Teachers Count
const getAllTeachersCount = (req, res) => {
    const { filter } = req.query;

    TeacherModel.getAllTeachersCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// create Teacher
const createTeacher = (req, res) => {
    const { firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, language, website , note , isAccountActivated , image, actions} = req.body;

    TeacherModel.createTeacher(firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, language, website , note , isAccountActivated , image, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Teachers
const editTeacher = (req, res) => {
    const { firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, language, website , note , isAccountActivated , image, actions} = req.body;
    const { id } = req.params;

    TeacherModel.editTeacher(id, firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, language, website , note , isAccountActivated , image, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Teacher Profile
const editTeacherProfile = (req, res) => {
    const { firstname, lastname, phone, email, website , password, facebook, twitter, linkedin, actions  } = req.body;
    const { id } = req.params;

    TeacherModel.editTeacherProfile(id, firstname, lastname, phone, email, website , password, facebook, twitter, linkedin, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// edit Teacher Image
const editTeacherImage = (req, res) => {
    const { image, actions } = req.body;
    const { id } = req.params;

    TeacherModel.editTeacherImage(id, image, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// delete Teacher
const deleteTeacher = (req, res) => {
    const { id } = req.params;

    TeacherModel.deleteTeacher(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllTeachers, getAllTeachersCount, createTeacher, editTeacher, editTeacherProfile, editTeacherImage, deleteTeacher }
