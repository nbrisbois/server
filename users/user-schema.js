import mongoose from 'mongoose';
const schema = mongoose.Schema({
    _id : String,
    avatar: String,
    name : String,
    username : String,
    email : String,
    password : String,
}, {collection: 'users'});
export default schema;