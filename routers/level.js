const LevelControlles = require("../controlles/level")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { LevelValidator  } = require("../middlewares/validators")

// getall Levels
router.get(ApiEndpoints.Levels.list , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  LevelControlles.getAllLevels ,  handleError)

// count Levels
router.get(ApiEndpoints.Levels.count , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  LevelControlles.getAllLevelsCount , handleError)

// create Level
router.post(ApiEndpoints.Levels.create,passport.authenticate("adminOrsuperAdmin", {session: false})  ,  LevelValidator, HandleValidatorError , LevelControlles.createLevel , handleError)

// edit Level
router.put(ApiEndpoints.Levels.edit , passport.authenticate("adminOrsuperAdmin", {session: false}) , LevelValidator , idValidator, HandleValidatorError , LevelControlles.editLevel , handleError)

// delete Level
router.delete(ApiEndpoints.Levels.delete , passport.authenticate("superAdmin", {session: false}), idValidator , LevelControlles.deleteLevel , handleError)


module.exports = router