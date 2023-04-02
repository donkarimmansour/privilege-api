const LanguageControlles = require("../controlles/language")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { LanguageValidator } = require("../middlewares/validators")

// getall Languages
router.get(ApiEndpoints.Languages.list , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  LanguageControlles.getAllLanguages ,  handleError)

// count Languages
router.get(ApiEndpoints.Languages.count , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  LanguageControlles.getAllLanguagesCount , handleError)

// create Language
router.post(ApiEndpoints.Languages.create,passport.authenticate("adminOrsuperAdmin", {session: false})  ,  LanguageValidator, HandleValidatorError , LanguageControlles.createLanguage , handleError)

// edit Language
router.put(ApiEndpoints.Languages.edit , passport.authenticate("adminOrsuperAdmin", {session: false}) , LanguageValidator , idValidator, HandleValidatorError , LanguageControlles.editLanguage , handleError)

// // edit image
// router.put(ApiEndpoints.Languages.image , passport.authenticate("adminOrsuperAdmin", {session: false}) , ImageValidator , idValidator, HandleValidatorError , LanguageControlles.editLanguageImage , handleError)
 
// delete Language
router.delete(ApiEndpoints.Languages.delete , passport.authenticate("superAdmin", {session: false}), idValidator , LanguageControlles.deleteLanguage , handleError)


module.exports = router