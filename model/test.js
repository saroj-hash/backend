const collection = require("../utilities/connection")

let model = {}

model.generateId = () => {
    const now = new Date()
    return (now%10000)
}

model.createComment = (commentObj) => {
    return model.generateId().then(commentId => {
        commentObj.CommentId = commentId
        return collection.getCommentCollection().then(collection => {
            return collection.create(commentObj).then(data => {
                if(data){
                    return true
                }
                else{
                    return false
                }
            })
        })
    })
}
model.insertEmails = (emailObj) => {
    return collection.getSubscriberCollection().then(collection => {
        return collection.find({},{_id:0,__v:0,createdAt:0,updatedAt:0}).then(data => {
            console.log("data at model after finding ->",data)
            let arr = []
            for(x of data){
                arr.push(x.Email)
            }
            console.log("array ->",arr)
            if(arr.indexOf(emailObj.Email) === -1){
                return collection.create(emailObj).then(response => {
                    console.log("response in model ->",response)
                    if(response)
                        return true
                    else return false
                })
            }
            else{
                return "dupVal"
            }
        })
    })
}

module.exports = model