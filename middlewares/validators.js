const {check} = require("express-validator");

const StudentValidator= [
   check("firstname").notEmpty().withMessage("firstname field is required") , 
   check("lastname").notEmpty().withMessage("lastname field is required") ,
   check("email").notEmpty().withMessage("email field is required") ,
   check("email").isEmail().withMessage("email must be email") ,
  // check("password").notEmpty().withMessage("password field is required") ,
   check("phone").notEmpty().withMessage("phone field is required") ,
   check("birthday").notEmpty().withMessage("birthday field is required") ,
   check("gender").notEmpty().withMessage("gender field is required") ,
   //check("className").notEmpty().withMessage("class field is required") ,
   check("hours").notEmpty().withMessage("hours field is required") ,
   check("option").notEmpty().withMessage("option field is required") ,
   check("session").notEmpty().withMessage("session field is required") ,
   check("cin").notEmpty().withMessage("cin field is required") ,
   check("username").notEmpty().withMessage("username field is required") ,
   check("isAccountActivated").notEmpty().withMessage("type field is required"),
]

const StudentProfileValidator= [
   check("firstname").notEmpty().withMessage("firstname field is required") , 
   check("lastname").notEmpty().withMessage("lastname field is required") ,
   check("email").notEmpty().withMessage("email field is required") ,
   check("email").isEmail().withMessage("email must be email") ,
   // check("password").notEmpty().withMessage("password field is required") ,
   check("phone").notEmpty().withMessage("phone field is required") ,
]

 const ImageValidator= [
   check("image").notEmpty().withMessage("image field is required") ,
]


const SignInValidator = [
    check("email").notEmpty().withMessage("email field is required") ,
    check("password").notEmpty().withMessage("password field is required") ,
]

 const forgotPasswordValidator = [
    check("email").notEmpty().withMessage("email field is required") 
 ]

 const DepartmentValidator = [
   check("headOfDepartment").notEmpty().withMessage("Head of Department field is required") ,
   check("departmentName").notEmpty().withMessage("Department Name field is required") 
]

const CourseValidator = [
   check("name").notEmpty().withMessage("name field is required") ,
   check("description").notEmpty().withMessage("description field is required") 
]

const GroupValidator = [
   check("name").notEmpty().withMessage("name field is required") ,
   check("className").notEmpty().withMessage("class field is required") ,
]

const LevelValidator = [
   check("name").notEmpty().withMessage("name field is required") ,
   check("group").notEmpty().withMessage("group field is required") ,
   check("department").notEmpty().withMessage("department field is required") , 
   check("position").notEmpty().withMessage("position field is required") 
]

const PaymentValidator = [
   check("studentID").notEmpty().withMessage("Student Name field is required") ,
   check("paymentStatus").notEmpty().withMessage("Payment Status field is required") ,
   check("paymentMethod").notEmpty().withMessage("Payment Method field is required") ,
   check("paymentDuration").notEmpty().withMessage("Payment Duration field is required") ,
   check("pending").notEmpty().withMessage("pending field is required") ,
   check("amount").notEmpty().withMessage("Amount field is required") ,
]

const BookValidator = [
   check("title").notEmpty().withMessage("title field is required") ,
   check("status").notEmpty().withMessage("status field is required") ,
   check("level").notEmpty().withMessage("level field is required") ,
   check("language").notEmpty().withMessage("language field is required") ,
]

const TeacherValidator = [
   check("firstname").notEmpty().withMessage("firstname field is required") , 
   check("lastname").notEmpty().withMessage("lastname field is required") ,
   check("email").notEmpty().withMessage("email field is required") ,
   check("email").isEmail().withMessage("email must be email") ,
  // check("password").notEmpty().withMessage("password field is required") ,
   check("phone").notEmpty().withMessage("phone field is required") ,
   check("birthday").notEmpty().withMessage("birthday field is required") ,
   check("gender").notEmpty().withMessage("gender field is required") ,
   check("username").notEmpty().withMessage("username field is required") ,
   check("isAccountActivated").notEmpty().withMessage("type is required"),
   check("teach").notEmpty().withMessage("teach field is required"),
]



module.exports = {
   StudentValidator ,
   ImageValidator ,
   StudentProfileValidator ,
   SignInValidator ,
   forgotPasswordValidator  ,
   DepartmentValidator ,
   CourseValidator ,
   GroupValidator ,
   LevelValidator , 
   PaymentValidator ,
   TeacherValidator ,
   BookValidator
}