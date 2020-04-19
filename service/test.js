const dbLayer = require("../model/test")
const validator = require("../utilities/validator")
let service = {}
service.insertEmails = (emailObj) => {
    validator.validateEmail(emailObj.Email)
    return dbLayer.insertEmails(emailObj).then(response => {
        console.log("service ->",response)
        if(response === true){
            return response
        }
        else if (response === false){
            let err = new Error("Some error occured!")
            err.status = 401
            throw err
        }
        else{
            let err = new Error("Sorry mate! You have already used this Email Id!")
            err.status = 501
            throw err
        }
    })
}

module.exports = service