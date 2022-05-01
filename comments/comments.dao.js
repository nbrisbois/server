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
    console.log(comment)
    return commentModel.remove({_id : comment._id})
}

export const likeComment = async (comment, id) => {
    comment = await commentModel.findOne({_id : comment._id})
    if (!(id in comment.userLikes)) {
        const likes = await commentModel.findOne({_id : comment._id})
        commentModel.updateOne({_id : comment._id},
            {$push: {userLikes : id}})

        const o = await commentModel.updateOne({_id : comment._id}, {likes : likes.likes + 1})
    }
}