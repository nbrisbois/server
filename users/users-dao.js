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

export const updateUser = async (id, file) => {
    await UsersModel.updateOne({_id : id}, {$set: {username : file.file.username}})
    await UsersModel.updateOne({_id : id}, {$set: {name : file.file.name}})
    await UsersModel.updateOne({_id : id}, {$set: {email : file.file.email}})
    await UsersModel.updateOne({_id : id}, {$set: {password : file.file.password}})
    return UsersModel.findOne({_id: id});
}

export const createUser = (uid) => UsersModel.create(uid);