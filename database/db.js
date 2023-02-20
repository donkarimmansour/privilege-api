const mongoose = require("mongoose")

const DB_URL = "mongodb://127.0.0.1:27017/school"
//const DB_URL = "mongodb+srv://admin:admin@cluster0.3av2c.mongodb.net/school"

function DB(){      
    return mongoose.connect(DB_URL, (err) => { 
            if (err) throw new Error("db error") 
             
            console.log("db start") 
    })
 
}


module.exports = DB     