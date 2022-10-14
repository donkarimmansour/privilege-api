const DepartmentModel = require("../services/department")
const codes = require("../common/codes")


// get All Departments
const getAllDepartments = (req, res) => {
    const { sort, limit, skip, filter, select } = req.query;

    DepartmentModel.getAllDepartments(sort, limit, skip, filter, select).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// get All Departments Count
const getAllDepartmentsCount = (req, res) => {
    const { filter } = req.query;

    DepartmentModel.getAllDepartmentsCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// create Department
const createDepartment = (req, res) => {
    const { headOfDepartment, departmentName, brief} = req.body;

    DepartmentModel.createDepartment( headOfDepartment, departmentName, brief).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Departments
const editDepartment = (req, res) => {
    const {  headOfDepartment, departmentName, brief} = req.body;
    const { id } = req.params;

    DepartmentModel.editDepartment(id,  headOfDepartment, departmentName, brief).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



// delete Department
const deleteDepartment = (req, res) => {
    const { id } = req.params;

    DepartmentModel.deleteDepartment(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllDepartments, getAllDepartmentsCount, createDepartment, editDepartment, deleteDepartment }
