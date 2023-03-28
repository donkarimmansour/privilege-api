const passport = require("passport");
const passportJwT = require("passport-jwt").Strategy;
const passportExtractJwt = require("passport-jwt").ExtractJwt;

const newRole = (name , role , msg , testMod = false) => {
    passport.use(name , new passportJwT({
        jwtFromRequest: passportExtractJwt.fromAuthHeaderAsBearerToken(), 
        secretOrKey: process.env.KEY 
    }, (Jwt_payload, done) => {
        
        if (role.includes(Jwt_payload.role) || testMod) {
            return done(null, Jwt_payload.user || Jwt_payload.admin)
        } else {
            return done({"message" : msg }, false) 
        }
    
    }))
}

newRole("superAdmin" , ["superAdmin"] , "superAdmin permission denied" , true)
newRole("admin" , ["admin"] , "admin permission denied" , true)
newRole("teacher" , ["teacher"] , "teacher permission denied" , true)
newRole("student" , ["student"] , "student Or admin permission denied" , true)

newRole("teacherOradminOrsuperAdmin" , ["admin" , "superAdmin", "teacher"] , "teacher Or admin Or superAdmin permission denied" , true)
newRole("adminOrsuperAdmin" , ["admin" , "superAdmin"] , "admin Or superAdmin permission denied" , true)
newRole("studentOrteacher" , ["student" , "teacher"] , "student Or teacher permission denied" , true)

newRole("all" , ["teacher", "student", "admin", "superAdmin"] , "teacher or student Or admin Or superAdmin permission denied" , true)

