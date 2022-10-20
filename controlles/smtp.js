const SmtpModel = require("../services/Smtp")
const codes = require("../common/codes")

 
// get Smtp
const getSmtp = (req, res) => {

    SmtpModel.getSmtp().then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// edit Smtps
const editSmtp = (req, res) => {
    const {  host , username , port , email , name , security , password} = req.body;
    const { id } = req.params;

    SmtpModel.editSmtp(id , host , username , port , email , name , security , password).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}






module.exports = { getSmtp, editSmtp }
