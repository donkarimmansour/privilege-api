const PromotionModel = require("../services/promotion")
const codes = require("../common/codes")

 
// get All Promotions
const getAllPromotions = (req, res) => {
    const { sort, limit, skip, filter, select, expend } = req.query;
 
    PromotionModel.getAllPromotions(sort, limit, skip, filter, select, expend).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// get All Promotions Count
const getAllPromotionsCount = (req, res) => {
    const { filter } = req.query;

    PromotionModel.getAllPromotionsCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



// create Promotion
const createPromotion = (req, res) => {
    const { name, description , language, session, actions} = req.body;

    PromotionModel.createPromotion(name, description , language, session, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// edit Promotion
const editPromotion = (req, res) => {
    const { name, description , language, session, actions} = req.body;
    const { id } = req.params;

    PromotionModel.editPromotion(id,name, description , language, session, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// delete Promotion
const deletePromotion = (req, res) => {
    const { id } = req.params;

    PromotionModel.deletePromotion(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllPromotions, createPromotion, deletePromotion, getAllPromotionsCount, editPromotion }
