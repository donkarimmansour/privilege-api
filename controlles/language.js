const LanguageModel = require("../services/language")
const codes = require("../common/codes")

 
// get All Languages
const getAllLanguages = (req, res) => {
    const { sort, limit, skip, filter } = req.query;

    LanguageModel.getAllLanguages(sort, limit, skip, filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// get All Languages Count
const getAllLanguagesCount = (req, res) => {
    const { filter } = req.query;

    LanguageModel.getAllLanguagesCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// create Language
const createLanguage = (req, res) => {
    const { name , description , session, actions} = req.body;

    LanguageModel.createLanguage( name , description , session, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Languages
const editLanguage = (req, res) => {
    const {  name , description , session, actions} = req.body;
    const { id } = req.params;

    LanguageModel.editLanguage(id,  name , description , session, actions).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// // edit Language Image
// const editLanguageImage = (req, res) => {
//     const { image } = req.body;
//     const { id } = req.params;

//     LanguageModel.editLanguageImage(id, image).then(result => {
//         res.status(codes.ok).json({ err: false, msg: result })
//     }).catch(result => {
//         res.status(codes.badRequest).json({ err: true, msg: result })
//     })
// }

// delete Language
const deleteLanguage = (req, res) => {
    const { id } = req.params;

    LanguageModel.deleteLanguage(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllLanguages, getAllLanguagesCount, createLanguage, editLanguage, deleteLanguage }
