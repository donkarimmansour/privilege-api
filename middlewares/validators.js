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
   check("language").notEmpty().withMessage("language field is required") ,
   check("hours").notEmpty().withMessage("hours field is required") ,
   check("option").notEmpty().withMessage("option field is required") ,
   check("session").notEmpty().withMessage("session field is required") ,
   check("cin").notEmpty().withMessage("cin field is required") ,
   check("username").notEmpty().withMessage("username field is required") ,
   check("isAccountActivated").notEmpty().withMessage("type field is required"),
   check("tested").notEmpty().withMessage("tested field is required"),
   check("actions").notEmpty().withMessage("actions field is required"),
   check("amount").notEmpty().withMessage("amount field is required"),
]

const StudentProfileValidator= [
   check("firstname").notEmpty().withMessage("firstname field is required") , 
   check("lastname").notEmpty().withMessage("lastname field is required") ,
   check("email").notEmpty().withMessage("email field is required") ,
   check("email").isEmail().withMessage("email must be email") ,
   // check("password").notEmpty().withMessage("password field is required") ,
   check("phone").notEmpty().withMessage("phone field is required") ,
   check("actions").notEmpty().withMessage("actions field is required")
]

const ImageValidator= [
   check("image").notEmpty().withMessage("image field is required") ,
   //check("actions").notEmpty().withMessage("actions field is required")
]


const SignInValidator = [
    check("email").notEmpty().withMessage("email field is required") ,
    check("password").notEmpty().withMessage("password field is required") ,
]

 const forgotPasswordValidator = [
    check("email").notEmpty().withMessage("email field is required"),
 ]

 const DepartmentValidator = [
   check("floorName").notEmpty().withMessage("floor Name field is required") ,
   check("className").notEmpty().withMessage("class Name field is required") ,
   check("actions").notEmpty().withMessage("actions field is required")
]

const LanguageValidator = [
   check("name").notEmpty().withMessage("name field is required") ,
  // check("description").notEmpty().withMessage("description field is required"),
   check("session").notEmpty().withMessage("session field is required"),
   check("registerFees").notEmpty().withMessage("register Fees field is required"),
   check("actions").notEmpty().withMessage("actions field is required")
]
 
const GroupValidator = [
   check("name").notEmpty().withMessage("name field is required") ,
   check("level").notEmpty().withMessage("level field is required") ,
   check("department").notEmpty().withMessage("department field is required") , 
   check("language").notEmpty().withMessage("language field is required"),
   check("session").notEmpty().withMessage("session field is required"),
   check("teacher").notEmpty().withMessage("teacher field is required"),
   check("option").notEmpty().withMessage("option field is required"),
   check("calindar").notEmpty().withMessage("calindar field is required"),
   check("actions").notEmpty().withMessage("actions field is required")
]

const LevelValidator = [
   check("name").notEmpty().withMessage("name field is required") ,
   check("languages").notEmpty().withMessage("languages field is required") ,
   check("actions").notEmpty().withMessage("actions field is required")
]

const PaymentValidator = [
   check("studentID").notEmpty().withMessage("Student Name field is required") ,
   check("paymentMethod").notEmpty().withMessage("Payment Method field is required") ,
   check("feesType").notEmpty().withMessage("feesType field is required") ,
   check("amount").notEmpty().withMessage("Amount field is required") ,
   check("actions").notEmpty().withMessage("actions field is required")
]

const BookValidator = [
   check("title").notEmpty().withMessage("title field is required") ,
   check("quantity").notEmpty().withMessage("quantity field is required") ,
   check("level").notEmpty().withMessage("level field is required") ,
   check("language").notEmpty().withMessage("language field is required") ,
   check("colorPrice").notEmpty().withMessage("color Price field is required") ,
   check("blackAndWhitePrice").notEmpty().withMessage("black And White Price field is required") ,
   check("actions").notEmpty().withMessage("actions field is required")
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
   check("isAccountActivated").notEmpty().withMessage("type field is required"),
   check("language").notEmpty().withMessage("language field is required"),
   check("actions").notEmpty().withMessage("actions field is required")
]

const SmtpValidator = [
   check("host").notEmpty().withMessage("host field is required"),
   check("username").notEmpty().withMessage("username field is required"),
   check("port").notEmpty().withMessage("port field is required"),
   check("email").notEmpty().withMessage("email field is required"),
   check("name").notEmpty().withMessage("name field is required"),
   check("security").notEmpty().withMessage("security field is required"),
   check("password").notEmpty().withMessage("password field is required")
]

const ExamValidator = [
   check("exam").notEmpty().withMessage("exam field is required"),
   check("studentID").notEmpty().withMessage("studentID field is required"),
   check("rate").notEmpty().withMessage("rate field is required"),
   check("quizzes").notEmpty().withMessage("quizzes field is required"),
   check("successed").notEmpty().withMessage("successed field is required")
]

const AdminValidator = [
   check("firstname").notEmpty().withMessage("firstname field is required") , 
   check("lastname").notEmpty().withMessage("lastname field is required") ,
   check("email").notEmpty().withMessage("email field is required") ,
   check("email").isEmail().withMessage("email must be email") ,
  // check("password").notEmpty().withMessage("password field is required") ,
   check("phone").notEmpty().withMessage("phone field is required") ,
   check("birthday").notEmpty().withMessage("birthday field is required") ,
   check("gender").notEmpty().withMessage("gender field is required") ,
   check("username").notEmpty().withMessage("username field is required") ,
   check("role").notEmpty().withMessage("role field is required") ,
   check("isAccountActivated").notEmpty().withMessage("type field is required"),
   check("actions").notEmpty().withMessage("actions field is required")
]

const NotificationValidator = [
   check("actions").notEmpty().withMessage("actions field is required"),
   check("message").notEmpty().withMessage("message field is required"),
   check("listIds").notEmpty().withMessage("listIds field is required"),
   check("title").notEmpty().withMessage("title field is required"),
]

const BillValidator = [
   check("studentID").notEmpty().withMessage("studentID field is required"),
   check("amount").notEmpty().withMessage("amount field is required"),
   check("actions").notEmpty().withMessage("actions field is required"),
]

const CancelationValidator = [
   check("name").notEmpty().withMessage("name field is required"),
   //check("description").notEmpty().withMessage("description field is required"),
   check("day").notEmpty().withMessage("day field is required"),
   check("actions").notEmpty().withMessage("actions field is required"),
]

const BlockValidator = [
   check("studentID").notEmpty().withMessage("name field is required"),
   check("actions").notEmpty().withMessage("actions field is required"),
]

 


module.exports = {
   StudentValidator ,
   ImageValidator ,
   StudentProfileValidator ,
   SignInValidator ,
   forgotPasswordValidator  ,
   DepartmentValidator ,
   LanguageValidator ,
   GroupValidator ,
   LevelValidator , 
   PaymentValidator ,
   TeacherValidator ,
   BookValidator ,
   SmtpValidator ,
   NotificationValidator ,
   ExamValidator ,
   AdminValidator ,
   BillValidator ,
   CancelationValidator ,
   BlockValidator
}