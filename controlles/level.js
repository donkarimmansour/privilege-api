const LevelModel = require("../services/level")
const codes = require("../common/codes") 


// get All Levels
const getAllLevels = (req, res) => {
    const { sort, limit, skip, filter, select, expend } = req.query;

    LevelModel.getAllLevels(sort, limit, skip, filter, select, expend).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    }) 
}

// get All Levels Count
const getAllLevelsCount = (req, res) => {
    const { filter } = req.query;

    LevelModel.getAllLevelsCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// create Level
const createLevel = (req, res) => {
    const { name, Level, department, position} = req.body;

    LevelModel.createLevel(name, Level, department, position).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Levels
const editLevel = (req, res) => {
    const { name, Level, department, position} = req.body;
    const { id } = req.params;

    LevelModel.editLevel(id, name, Level, department, position).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
} 


// delete Level
const deleteLevel = (req, res) => {
    const { id } = req.params;

    LevelModel.deleteLevel(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllLevels, getAllLevelsCount, createLevel, editLevel, deleteLevel }
