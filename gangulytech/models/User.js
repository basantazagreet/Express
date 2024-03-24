const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    isActive: {type:Boolean, default:true},
    createdOn: {type:Date, default:Date.now()}
    
});

module.exports = mongoose.model('users', UserSchema)