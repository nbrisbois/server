import UsersModel from "./users-model.js";
import userModel from "./users-model.js";

export const findRegister = (username, email) => {
    return UsersModel.findOne({$or: [{username : username}, {email : email}]})
}

export const findLogin = (username, password) => {
    return UsersModel.findOne({username : username, password : password})
}

export const findUsername = () => {
    return UsersModel.find()
}

export const updateUser = (id, avatar) => {
    const something =  UsersModel.updateOne({_id : id}, {$set: {avatar: avatar}})
    return something
}

export const createUser = (uid) => UsersModel.create(uid);