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


newRole("student" , ["student" , "student permission denied" ] , "student Or admin permission denied" , true)
newRole("teacher" , ["teacher" , "teacher permission denied" ] , "teacher permission denied" , true)
newRole("admin" , ["admin" , "admin permission denied" ] , "admin permission denied" , true)
newRole("teacherOradmin" , ["teacher" , "admin"] , "teacher Or admin permission denied" , true)
newRole("all" , ["teacher", "student" , "admin"] , "teacher or student Or admin permission denied" , true)

