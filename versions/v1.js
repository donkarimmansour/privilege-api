const { ApiEndpoints } = require("../common/apiEndpoints")
const { app  } = require("../server") 

const File = require("../routers/file")
const Student = require("../routers/student") 
const Auth = require("../routers/auth")
const Group = require("../routers/group")
const Level = require("../routers/level")
const Teacher = require("../routers/teacher")
const Payment = require("../routers/payment")
const Book = require("../routers/book")
const Language = require("../routers/language")
const Department = require("../routers/department")
const Notification = require("../routers/notification")
const Exam = require("../routers/exam")
const Smtp = require("../routers/smtp")
const Admin = require("../routers/admin")
const Bill = require("../routers/bill")
const Cancelation = require("../routers/cancelation")
const Promotion = require("../routers/promotion")

// require("../socket/socket")

app.use(ApiEndpoints.File.route, File)
app.use(ApiEndpoints.Students.route, Student)
app.use(ApiEndpoints.Auth.route, Auth)
app.use(ApiEndpoints.Groupes.route, Group)
app.use(ApiEndpoints.Levels.route, Level)
app.use(ApiEndpoints.Teachers.route, Teacher)
app.use(ApiEndpoints.Payments.route, Payment)
app.use(ApiEndpoints.Library.route, Book)
app.use(ApiEndpoints.Languages.route, Language)
app.use(ApiEndpoints.Department.route, Department)
app.use(ApiEndpoints.Notifications.route, Notification)
app.use(ApiEndpoints.Exam.route, Exam)
app.use(ApiEndpoints.Smtp.route, Smtp)
app.use(ApiEndpoints.Admins.route, Admin)
app.use(ApiEndpoints.Bills.route, Bill)
app.use(ApiEndpoints.Cancelations.route, Cancelation)
app.use(ApiEndpoints.Promotions.route, Promotion)

//cron job
require("../services/cron") 

app.use((req, res, next) => {
    res.status(404).json("Api not found") 
})


app.listen(process.env.PORT || 3001 , () => {
    console.log("server start")
})