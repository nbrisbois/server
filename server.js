import userController from "./controllers/user-controller.js";
import commentController from "./controllers/comment-controller.js"
import cors from 'cors';
import express from 'express';

import mongoose from "mongoose";
import session from "express-session";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
    || 'mongodb+srv://nbrisbois:nbrisbois123@cluster0.lntgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&authSource=admin'

mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true,
}))
app.use(express.json());

const sess = {
    secret : 'keyboard cat',
    cookie: {}
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

app.use(session(sess))

userController(app);
commentController(app)
app.listen(process.env.PORT || 4000);