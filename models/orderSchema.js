const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    products:[
        {
            productId:{type: mongoose.Schema.Types.ObjectId, ref:'Product', required: true}
        }
    ],
    totalPrice:{},
    totalItems:{}
},{
    timestamps:true
})

module.exports = mongoose.model('Orders', orderSchema);