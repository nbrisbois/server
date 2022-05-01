import mongoose from "mongoose";
import commentSchema from "./comments-schema.js"

const commentsModel = mongoose.model(
    'CommentsModel',
    commentSchema
)

export default commentsModel