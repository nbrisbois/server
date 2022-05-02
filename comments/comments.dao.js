import commentModel from "./comments-model.js"

export const postComment = async (userId, videoId, comment) => {
    comment.commenter = userId
    comment.videoId = videoId
    comment.postTime = Date.now()
    const response =  await commentModel.create(comment)
    return response
}

export const findComments = async () => {
   return commentModel.find()
}

export const deleteComment = async (comment) => {
    return commentModel.deleteOne({_id : comment._id})
}

export const likeComment = async (comment, id) => {
    comment = await commentModel.findOne({_id : comment._id})
    if (!comment.userLikes.includes(id)) {
        const likes = await commentModel.findOne({_id : comment._id})
        await commentModel.updateOne({_id : comment._id},
            {$push: {userLikes : id}})
        const o = await commentModel.updateOne({_id : comment._id}, {likes : likes.likes + 1})
    }
    else {
        const likes = await commentModel.findOne({_id : comment._id})
        await commentModel.updateOne({_id : comment._id},
            {$pull: {userLikes : id}})
        const o = await commentModel.updateOne({_id : comment._id}, {likes : likes.likes - 1})
    }
    return commentModel.findOne({_id : comment._id})
}