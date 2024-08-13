const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.ObjectId, ref:'User', required:true},
    products:[
        {
            productId:{type: mongoose.Schema.ObjectId, ref:'Product', required: true},
            quantity:{type: Number, required: true, default: 1}
        }
    ]
})

module.exports = mongoose.model('Cart',cartSchema);