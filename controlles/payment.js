const PaymentModel = require("../services/payment")
const codes = require("../common/codes")

 
// get All Payments
const getAllPayments = (req, res) => {
    const { sort, limit, skip, filter, select, expend } = req.query;

    PaymentModel.getAllPayments(sort, limit, skip, filter, select, expend).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// get All Payments Count
const getAllPaymentsCount = (req, res) => {
    const { filter } = req.query;

    PaymentModel.getAllPaymentsCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// create Payment
const createPayment = (req, res) => {
    const { studentID, paymentStatus, paymentMethod, paymentDuration, paymentReference, paymentDetails, feesType, pending, amount} = req.body;

    PaymentModel.createPayment(studentID, paymentStatus, paymentMethod, paymentDuration, paymentReference, paymentDetails, feesType, pending, amount).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Payments
const editPayment = (req, res) => {
    const { studentID, paymentStatus, paymentMethod, paymentDuration, paymentReference, paymentDetails, feesType, pending, amount} = req.body;
    const { id } = req.params;

    PaymentModel.editPayment(id, studentID, paymentStatus, paymentMethod, paymentDuration, paymentReference, paymentDetails, feesType, pending, amount).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// delete Payment
const deletePayment = (req, res) => {
    const { id } = req.params;

    PaymentModel.deletePayment(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllPayments, getAllPaymentsCount, createPayment, editPayment, deletePayment }
