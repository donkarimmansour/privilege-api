const mongoose = require("mongoose")

const DB_URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "mongodb://127.0.0.1:27017/school" : "mongodb+srv://admin:admin@cluster0.3av2c.mongodb.net/privilege"

function DB(){     
    console.log(DB_URL)
    
    return mongoose.connect(DB_URL, (err) => { 
            if (err) throw new Error("db error") 
            console.log("db start") 
    })
 
}


module.exports = DB     