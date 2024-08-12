const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{type : String, required : true},
    description:{ type: String},
    price: { type: Number},
    image:{type: String},
    category: { type: String},
    isDeleted: { type: Boolean}
},{
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);