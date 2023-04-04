
const {Host} = require("./apiEndpoints")

const resetPasswordMsg = (newPass) => {
    const html = `<h1>Hi User</h1>
    <br><br> 
    <h2>new Password</h2>
    <br><br>
     password = ${newPass} `
    return html ;
}


module.exports = { resetPasswordMsg }
