const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
mongoose.set("useCreateIndex",true)
let commentSchema = {
    "CommentId" : {
        type:Number,
        unique:true,
        required:true
    },
    "Name" : {
        type:String,
        required:true
    },
    "Comment":{
        type:String,
        required:true
    }
}
let replySchema = {
    "commentId" : {
        type:Number,
        unique:true,
        required:true
    },
    "Replies" : {
        type : [{
            "Name"  : {
                type : String,
                required : true
            },
            "Reply" : {
                type : String,
                required : true
            }
        }],
        default : []
    }
}
let subscribeSchema = {
    "Email" : {
        type : String,
        required : true,
        unique : true
    }
}

let CommentSchema = new Schema(commentSchema, { collection : "Comments", timestamps : true})
let ReplySchema = new Schema(replySchema, { collection : "Replies", timestamps : true})
let SubscribeSchema = new Schema(subscribeSchema, { collection : "Subcscribers", timestamps : true})

let connection = {}

connection.getCommentCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/WJDB",{ useNewUrlParser: true }).then((db) => {
        console.log("Connected to DB")
        return db.model("Comments",CommentSchema)
    }).catch(err => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getReplyCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/WJDB",{ useNewUrlParser: true }).then((db) => {
        console.log("Connected to DB")
        return db.model("Replies",ReplySchema)
    }).catch(err => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getSubscriberCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/WJDB",{ useNewUrlParser: true }).then((db) => {
        console.log("Connected to  Subscriber DB")
        return db.model("Subcscribers",SubscribeSchema)
    }).catch(err => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

module.exports = connection