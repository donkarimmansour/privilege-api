const fileService = require("../services/file")
const fs = require("fs")
const codes = require("../common/codes")

//create Single File
const createSingleFile = (req, res) => {


  const { filename } = req.file

  fileService.createSingleFile(filename)
    .then(result => {

      res.status(codes.ok).json({ err: false, msg: result })

    }).catch(err => res.status(codes.badRequest).json({ err: true, msg: err }))

}

//get Single File View
const getSingleFileView = (req, res) => {
  const { id } = req.params

  fileService.getSingleFile(id).then(result => {

    fs.readFile(`public/images/${result.file}`, function (err, data) {
      if (err) res.status(codes.badRequest).json({ err: true, msg: err })
      else {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
      }
    });

  }).catch(err => res.status(codes.badRequest).json({ err: true, msg: err }))



}



//get Single File Download
const getSingleFileDownload = (req, res) => {

  const { id } = req.params

  fileService.getSingleFile(id).then(result => {
    res.download(`public/images/${result.file}`, err => {
      if (err) {
        res.status(codes.badRequest).json({ err: true, msg: "The re was an error fetching your image" })
      }
    })

  }).catch(err => res.status(codes.badRequest).json({ err: true, msg: err }))

}

module.exports = {
  createSingleFile,
  getSingleFileDownload,
  getSingleFileView
}
