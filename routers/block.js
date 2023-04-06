const BlockControlles = require("../controlles/blocks")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { BlockValidator  } = require("../middlewares/validators")
 
// getall Block
router.get(ApiEndpoints.Blocks.list , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  BlockControlles.getAllBlocks ,  handleError)
 
// count Blocks
router.get(ApiEndpoints.Blocks.count , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  BlockControlles.getAllBlocksCount , handleError)

// create Block 
router.post(ApiEndpoints.Blocks.create,passport.authenticate("adminOrsuperAdmin", {session: false})  ,  BlockValidator, HandleValidatorError , BlockControlles.createBlock , handleError)

// edit Block
router.put(ApiEndpoints.Blocks.edit , passport.authenticate("adminOrsuperAdmin", {session: false}) , BlockValidator , idValidator, HandleValidatorError , BlockControlles.editBlock , handleError)

// delete Block
router.delete(ApiEndpoints.Blocks.delete , passport.authenticate("superAdmin", {session: false}), idValidator , BlockControlles.deleteBlock , handleError)


module.exports = router