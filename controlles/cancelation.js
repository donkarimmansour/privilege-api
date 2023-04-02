const CancelationModel = require("../services/cancelation")
const codes = require("../common/codes")

 
// get All Cancelations
const getAllCancelations = (req, res) => {
    const { sort, limit, skip, filter, select, expend } = req.query;
 
    CancelationModel.getAllCancelations(sort, limit, skip, filter, select, expend).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// get All Cancelations Count
const getAllCancelationsCount = (req, res) => {
    const { filter } = req.query;

    CancelationModel.getAllCancelationsCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



// create Cancelation
const createCancelation = (req, res) => {
    const { name, description, day , group, actions} = req.body;

    CancelationModel.createCancelation(name, description, day , group, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Cancelation
const editCancelation = (req, res) => {
    const { name, description, day , group, actions} = req.body; 
    const { id } = req.params;

    CancelationModel.editCancelation(id,name, description, day , group, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// delete Cancelation
const deleteCancelation = (req, res) => {
    const { id } = req.params;

    CancelationModel.deleteCancelation(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllCancelations, createCancelation, deleteCancelation, getAllCancelationsCount, editCancelation }
