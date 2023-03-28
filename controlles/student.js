const StudentModel = require("../services/student")
const codes = require("../common/codes")


// get All Students
const getAllStudents = (req, res) => {
    const { sort, limit, skip, filter, select, expend } = req.query;

    StudentModel.getAllStudents(sort, limit, skip, filter, select, expend).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// get All Students Count
const getAllStudentsCount = (req, res) => {
    const { filter } = req.query;

    StudentModel.getAllStudentsCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// create Student
const createStudent = (req, res) => {
    const {tested , firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, language, group, level, hours, option, session, cin , isAccountActivated , image, actions, amount} = req.body;

    StudentModel.createStudent(tested , firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, language, group, level, hours, option, session, cin , isAccountActivated , image, actions, amount).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Students
const editStudent = (req, res) => {
    const { tested , firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, language, group, level, hours, option, session, cin , isAccountActivated, actions, amount} = req.body;
    const { id } = req.params;

    StudentModel.editStudent(id, tested , firstname, lastname, gender, phone, birthday, username, email, password, facebook, twitter, linkedin, language, group, level, hours, option, session, cin , isAccountActivated, actions, amount).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Student Profile
const editStudentProfile = (req, res) => {
    const { firstname, lastname, phone, email, password, facebook, twitter, linkedin, actions  } = req.body;
    const { id } = req.params;

    StudentModel.editStudentProfile(id, firstname, lastname, phone, email, password, facebook, twitter, linkedin, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// edit Student Image
const editStudentImage = (req, res) => {
    const { image, actions } = req.body;
    const { id } = req.params;

    StudentModel.editStudentImage(id, image, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// delete Student
const deleteStudent = (req, res) => {
    const { id } = req.params;

    StudentModel.deleteStudent(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllStudents, getAllStudentsCount, createStudent, editStudent, editStudentProfile, editStudentImage, deleteStudent }
