const BillControlles = require("../controlles/bill")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { BillValidator  } = require("../middlewares/validators")

// getall Bills
router.get(ApiEndpoints.Bills.list , passport.authenticate("admin", {session: false}) ,  BillControlles.getAllBills ,  handleError)
 
// count Bills
router.get(ApiEndpoints.Bills.count , passport.authenticate("admin", {session: false}) ,  BillControlles.getAllBillsCount , handleError)

// create Bill 
router.post(ApiEndpoints.Bills.create,passport.authenticate("admin", {session: false})  ,  BillValidator, HandleValidatorError , BillControlles.createBill , handleError)

// edit Bill 
router.post(ApiEndpoints.Bills.edit,passport.authenticate("admin", {session: false})  ,  BillValidator, idValidator, HandleValidatorError , BillControlles.createBill , handleError)

// delete Bill
router.delete(ApiEndpoints.Bills.delete , passport.authenticate("admin", {session: false}), idValidator , BillControlles.deleteBill , handleError)


module.exports = router