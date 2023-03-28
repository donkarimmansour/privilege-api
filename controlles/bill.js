const BillModel = require("../services/Bill")
const codes = require("../common/codes")

  
// get All Bills
const getAllBills = (req, res) => {
    const { sort, limit, skip, filter, select, expend } = req.query;

    BillModel.getAllBills(sort, limit, skip, filter, select, expend).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// get All Bills Count
const getAllBillsCount = (req, res) => {
    const { filter } = req.query;

    BillModel.getAllBillsCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// create Bill
const createBill = (req, res) => {
    const { studentID, amount, actions } = req.body;

    BillModel.createBill(studentID, amount, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// edit Bill
const editBill = (req, res) => {
    const { studentID, amount, actions } = req.body;
    const { id } = req.params;

    BillModel.editBill(id, studentID, amount, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
} 

// delete Bill
const deleteBill = (req, res) => {
    const { id } = req.params;

    BillModel.deleteBill(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllBills, createBill, deleteBill, editBill, getAllBillsCount }
