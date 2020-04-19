const express = require("express")
const routing = express.Router();
const service = require("../service/test")

routing.post("/insertEmail",(req,res,next) => {
    let emailObj=req.body;
    service.insertEmails(emailObj).then(data => {
        console.log("routing ->",data)
        if(data){
            res.json({message : `Welcome to the club`})
        }
    }).catch(err => {
        next(err)
    })
})

module.exports = routing