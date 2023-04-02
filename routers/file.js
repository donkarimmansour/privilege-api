const fileControlles = require("../controlles/file")
const { singleFile } = require("../common/uploader")
const {  handleError , idValidator , passport , ApiEndpoints} = require("../common/routersImports")
const router = require("express").Router()

 
// get Single File View
router.get(ApiEndpoints.File.getSingleFileView  ,// passport.authenticate("admin", {session: false}) ,
idValidator , fileControlles.getSingleFileView , handleError)
 
// // get Single File Download
// router.get(ApiEndpoints.File.getSingleFileDownload  , passport.authenticate("admin", {session: false}) ,
//     idValidator , fileControlles.getSingleFileDownload , handleError)
       
// create Single File  
router.post(ApiEndpoints.File.createSingleFile ,  passport.authenticate("all", {session: false}) , singleFile("./public/images" , "image") , fileControlles.createSingleFile , handleError)
  


module.exports = router
