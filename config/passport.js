const passport = require("passport");
const passportJwT = require("passport-jwt").Strategy;
const passportExtractJwt = require("passport-jwt").ExtractJwt;

const newRole = (name , role , msg , testMod = false) => {
    passport.use(name , new passportJwT({
        jwtFromRequest: passportExtractJwt.fromAuthHeaderAsBearerToken(), 
        secretOrKey: process.env.KEY 
    }, (Jwt_payload, done) => {
        
        if (role.includes(Jwt_payload.role) || testMod) {
            return done(null, Jwt_payload)
        } else {
            return done({"message" : msg }, false) 
        }
    
    }))
} 

newRole("superAdmin" , ["superAdmin"] , "superAdmin permission denied" , false)
newRole("admin" , ["admin"] , "admin permission denied" , false)
newRole("teacher" , ["teacher"] , "teacher permission denied" , false)
newRole("student" , ["student"] , "student Or admin permission denied" , false)

newRole("teacherOradminOrsuperAdmin" , ["admin" , "superAdmin", "teacher"] , "teacher Or admin Or superAdmin permission denied" , false)
newRole("studentOradminOrsuperAdmin" , ["admin" , "superAdmin", "student"] , "student Or admin Or superAdmin permission denied" , false)
newRole("adminOrsuperAdmin" , ["admin" , "superAdmin"] , "admin Or superAdmin permission denied" , false)
newRole("studentOrsuperAdmin" , ["student" , "superAdmin"] , "student Or superAdmin permission denied" , false)
newRole("studentOrteacher" , ["student" , "teacher"] , "student Or teacher permission denied" , false)

newRole("all" , ["teacher", "student", "admin", "superAdmin"] , "teacher Or student Or admin Or superAdmin permission denied" , false)

