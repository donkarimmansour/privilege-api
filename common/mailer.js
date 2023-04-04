
const nodemailer = require("nodemailer")


const sendMAIL = (to, subject, html, smtp) => {
    return new Promise((resolve, reject) => {

        nodemailer.createTransport({
            host: smtp.host,//process.env.SMTP_HOST,
            port: smtp.port,//process.env.SMTP_PORT,
            secure: ["SSL", "TLS"].includes(smtp.security),
            auth: {
                user: smtp.username,//process.env.SMTP_USER,
                pass: smtp.password,//process.env.SMTP_PASSWORD
            }
        }).sendMail({
            from : `"${smtp.name/*process.env.SMTP_SENDER_NAME*/}" <${smtp.email/*process.env.SMTP_SENDER_EMAIL*/}>`,
            to,
            subject,
            html
        }, (err, info) => {
            if (err) {
                console.log(err);
                reject("something went wrong")
            }
            resolve("successfully sent")
        })
    })

}
module.exports = { 
    sendMAIL
}