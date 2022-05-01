import {
    findRegister as reg,
    findLogin as log,
    createUser as create,
    updateUser as updateUser,
    findUsername as find,
} from "../users/users-dao.js";
import express from "express";

const register = async (req, res) => {
    const newUser = req.body;
    newUser.avatar = "./images/default.png"
    newUser._id = (new Date()).getTime()+''
    const user = await reg(req.body.username, req.body.email)
    if (user) {
        return res.sendStatus(403)
    }
    else {
        const insertedUser = await create(newUser);
        req.session['currentUser'] = insertedUser
        res.json(insertedUser)
    }
}

const login = async (req, res) => {
    const existingUser = await log(req.body.username, req.body.password)
    if(existingUser) {
        req.session['currentUser'] = existingUser
        res.json(existingUser)
    }
    else {
        res.sendStatus(503)
    }
}

const profile = async (req, res) => {
    const currentUser = req.session['currentUser']
    if (currentUser)  {
        res.json(currentUser)
    }
    else {
        res.sendStatus(503)
    }
}

const logout = async (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
}

const update = async (req, res) => {
    const currentUser = req.session['currentUser']
    await updateUser(currentUser._id, req.body.avatar)
    res.sendStatus(200)
}

const findUser = async (req, res) => {
    const user = find(req.body.id)
    return res.json(user)
}

export default (app) => {
    app.post('/api/register', register)
    app.post('/api/signout', logout)
    app.post('/api/profile', profile)
    app.post('/api/login', login)
    app.post('/api/update', update)
    app.post('/api/user', findUser)
}