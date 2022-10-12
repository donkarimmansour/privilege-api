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


newRole("admin" , ["user" , "admin"] , "admin permission denied" , true)
newRole("student" , ["student" , "student permission denied" ] , true)
newRole("studentOradmin" , ["student" , "admin"] , "student Or admin permission denied" , true)

