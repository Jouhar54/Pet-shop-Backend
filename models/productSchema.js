const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{type : String, required : true},
    description:{ type: String},
    price: { type: Number, required: true},
    image:{type: String},
    category: { type: String, required: true},
    isDeleted: { type: Boolean, default: false },
    quantity: {type: Number, default: 1}
},{
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);