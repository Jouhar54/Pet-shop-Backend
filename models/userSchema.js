const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    username:{
        type : String, 
        trim: true,
        required : true
    },

    email:{
        type: String,
        trim: true,
        required : true, 
        unique : true
    },

    password:{
        type: String, 
        trim: true,
        required : true
    },

    profileImg:{
        type : String
    },

    profileThumbImg:{
        type : String
    },

    isDeleted:{
        type : Boolean, default : false
    },

    isAdmin:{
        type: Boolean, default: false
    },
    
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Cart'
    },
    wishlist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WishList'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Orders'
    }
},{
    timestamps : true,
});

module.exports = mongoose.model('User', userSchema);