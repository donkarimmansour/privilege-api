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
const Course = require("../routers/course")
const Department = require("../routers/department")
const Notification = require("../routers/notification")
const Exam = require("../routers/exam")
const Smtp = require("../routers/smtp")
const Admin = require("../routers/admin")

// require("../socket/socket")

app.use(ApiEndpoints.File.route, File)
app.use(ApiEndpoints.Students.route, Student)
app.use(ApiEndpoints.Auth.route, Auth)
app.use(ApiEndpoints.Groupes.route, Group)
app.use(ApiEndpoints.Levels.route, Level)
app.use(ApiEndpoints.Professors.route, Teacher)
app.use(ApiEndpoints.Payments.route, Payment)
app.use(ApiEndpoints.Library.route, Book)
app.use(ApiEndpoints.Course.route, Course)
app.use(ApiEndpoints.Department.route, Department)
app.use(ApiEndpoints.Notifications.route, Notification)
app.use(ApiEndpoints.Exam.route, Exam)
app.use(ApiEndpoints.Smtp.route, Smtp)
app.use(ApiEndpoints.Admins.route, Admin)

app.use((req, res, next) => {
    res.status(404).json("Api not found") 
})


app.listen(process.env.PORT || 3000 , () => {
    console.log("server start")
})