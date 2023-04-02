const PaymentControlles = require("../controlles/payment")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { PaymentValidator   } = require("../middlewares/validators")

// getall Payments
router.get(ApiEndpoints.Payments.list , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  PaymentControlles.getAllPayments ,  handleError)

// count Payments
router.get(ApiEndpoints.Payments.count , passport.authenticate("adminOrsuperAdmin", {session: false}) ,  PaymentControlles.getAllPaymentsCount , handleError)

// create Payment
router.post(ApiEndpoints.Payments.create,passport.authenticate("adminOrsuperAdmin", {session: false})  ,  PaymentValidator, HandleValidatorError , PaymentControlles.createPayment , handleError)

// edit Payment
router.put(ApiEndpoints.Payments.edit , passport.authenticate("adminOrsuperAdmin", {session: false}) , PaymentValidator , idValidator, HandleValidatorError , PaymentControlles.editPayment , handleError)

// delete Payment
router.delete(ApiEndpoints.Payments.delete , passport.authenticate("superAdmin", {session: false}), idValidator , PaymentControlles.deletePayment , handleError)


module.exports = router