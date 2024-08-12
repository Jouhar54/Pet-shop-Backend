const mongoose = require('mongoose');
const { type } = require('os');

const userLoginSchema = new mongoose.Schema({
    username:{type : String, required : true},
    email:{type: String, required : true, unique : true},
    password:{type: String, required : true},
    profileImg:{type : String},
    profileThumbImg:{type : String},
    isDeleted:{type : Boolean, default : false},
    isAdmin:{type: Boolean}
},{
    timestamps : true,
});

module.exports = mongoose.model('User', userLoginSchema);