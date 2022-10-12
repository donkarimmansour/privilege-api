const messages = require("../common/messages")
const mailer = require("../common/mailer")
const JWt = require("jsonwebtoken")
const StudentRquest = require("../models/student")



// SignIn
const SignIn = (email, password , role) => {

    return new Promise((resolve, reject) => { // check details

        let Rquest = null  

        if(role === "student"){
            Rquest = StudentRquest
            
        }else if ( 7 > 8 ){

        }
        
        Rquest.findOne({}, (errFind, user) => {
            if (errFind){ 
                reject(errFind)
                 return 
            } else if (!user || !user.comparePassword(password)) {    
                reject("email or username or password is incorrect")
           
            }else {
                if(!user.isAccountActivated){ 
                    reject("your account is not activated")
                }else{
                    
                    const TOKEN = JWt.sign({
                        user : {...user._doc , role : role } 
                    }, process.env.KEY, {expiresIn: "7d"})

                    resolve({TOKEN})
                }
               
            }

        }).or([{ email }, { username : email }])//.populate("image")

    })
}




// forgot Password 
const forgotPassword = (email , role) => {
    return new Promise((resolve, reject) => { // update user

        let Rquest = null  

        if(role === "student"){
            Rquest = StudentRquest
        }else if ( 7 > 8 ){

        }

       // check id
         Rquest.findOne({}, (errFind, user) => {
            if (errFind) {
                reject(errFind)
            
           }else if (!user) {
                reject("your email or username is not defined")

            } else {

                //update
                   const password = (Math.random() + 1).toString(36).substring(4);

                     //current pasword => llwl1j4s

                     Rquest.updateOne({}, {
                        password: new Rquest().hashPassword(password),
                        updatedAt: Date.now()
                    }, (errUpdate, doc) => {
                        if (errUpdate){ 
                            reject(errUpdate) 
                        
                       }else if (doc.modifiedCount > 0) {

                           //get confim Email Msg
                           const html = messages.resetPasswordMsg(password)

                           // send Email Verification
                           mailer.sendMAIL(email, "new Password", html)
                           .then((succ) => resolve("new Sent password"))
                           .catch(error => reject(error))
            
                        } else {
                            reject("something went wrong")
            
                        }

            
                    }).or([{ email }, { username : email }])
                }


        }).or([{ email }, { username : email }])



    }) 
}



module.exports = { SignIn , forgotPassword }