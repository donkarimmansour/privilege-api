const PromotionControlles = require("../controlles/promotion")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { PromotionValidator  } = require("../middlewares/validators")

// getall Promotion
router.get(ApiEndpoints.Promotions.list , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  PromotionControlles.getAllPromotions ,  handleError)
 
// count Promotions
router.get(ApiEndpoints.Promotions.count , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  PromotionControlles.getAllPromotionsCount , handleError)

// create Promotion 
router.post(ApiEndpoints.Promotions.create,passport.authenticate("adminOrsuperAdmin", {session: false})  ,  PromotionValidator, HandleValidatorError , PromotionControlles.createPromotion , handleError)

// edit Promotion
router.put(ApiEndpoints.Promotions.edit , passport.authenticate("adminOrsuperAdmin", {session: false}) , PromotionValidator , idValidator, HandleValidatorError , PromotionControlles.editPromotion , handleError)

// delete Promotion
router.delete(ApiEndpoints.Promotions.delete , passport.authenticate("superAdmin", {session: false}), idValidator , PromotionControlles.deletePromotion , handleError)


module.exports = router