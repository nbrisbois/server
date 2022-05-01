import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
    comment : String,
    commenter : String,
    videoId : String,
    likes : {type : Number, default : 0},
    userLikes : [],
    username : {type : String, default : ""},
    avatar : {type : String, default : ""}
}, {collection : "comments"})
export default commentsSchema