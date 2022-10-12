const { ApiEndpoints } = require("../common/apiEndpoints")
const { app  } = require("../server") 

const File = require("../routers/file")
const Student = require("../routers/student") 
const Auth = require("../routers/auth")

// require("../socket/socket")

app.use(ApiEndpoints.File.route, File)
app.use(ApiEndpoints.Students.route, Student)
app.use(ApiEndpoints.Auth.route, Auth)

app.use((req, res, next) => {
    res.status(404).json("Api not found") 
})


app.listen(process.env.PORT || 3000 , () => {
    console.log("server start")
})