const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId,ref:'User', required: true},
    products:[
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref:'Product', required: true},
        }
    ]
})

module.exports = mongoose.model('WishList', wishSchema);