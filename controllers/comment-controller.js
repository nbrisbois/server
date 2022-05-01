import {
    postComment as post,
    findComments as find,
    deleteComment as remove,
    likeComment as liked
} from "../comments/comments.dao.js";
import {findUsername} from "../users/users-dao.js"


const postComment = async (req, res) => {
    const comment = req.body
    const videoId = req.params.videoId
    const userId = req.params.userId
    const insertedComment = await post(userId, videoId, comment)
    res.json(insertedComment)
}

const findComments = async (req, res) => {
    var comments = await find()
    var users = await findUsername()
    for(var i = 0; i < Object.keys(comments).length; i++) {
        for (var o = 0; o < Object.keys(users).length; o++) {
            if (comments[i].commenter === users[o]._id) {
                comments[i].username = users[o].username
                comments[i].avatar = users[o].avatar
            }
        }
    }
    return res.json(comments)
}

const like = async (req, res) => {
    const videoId = req.params.id
    await liked(req.body, videoId)
    res.sendStatus(200)
}

const deleteComment = async (req, res) => {
    const response = await remove(req.body)
    res.sendStatus(200)
}


export default (app) => {
    app.post('/api/video/:videoId/comment/:userId', postComment)
    app.post('/api/video', findComments)
    app.post('/api/video/delete', deleteComment)
    app.post('/api/video/like/:id', like)
}