const BlockModel = require("../services/blocks")
const codes = require("../common/codes")

  
// get All Blocks
const getAllBlocks = (req, res) => {
    const { sort, limit, skip, filter, select, expend } = req.query;
 
    BlockModel.getAllBlocks(sort, limit, skip, filter, select, expend).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// get All Blocks Count
const getAllBlocksCount = (req, res) => {
    const { filter } = req.query;

    BlockModel.getAllBlocksCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}
 
 

// create Block
const createBlock = (req, res) => {
    const { studentID, description, actions} = req.body;

    BlockModel.createBlock(studentID, description, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// edit Block
const editBlock = (req, res) => {
    const { studentID, description, actions} = req.body;
    const { id } = req.params;

    BlockModel.editBlock(id,studentID, description, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// delete Block
const deleteBlock = (req, res) => {
    const { id } = req.params;

    BlockModel.deleteBlock(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllBlocks, createBlock, deleteBlock, getAllBlocksCount, editBlock }
