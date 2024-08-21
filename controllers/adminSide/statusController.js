const orderSchema = require("../../models/orderSchema");
const productSchema = require("../../models/productSchema");

const status = async (req, res)=>{
    try {
        const totals = await orderSchema.find().populate({
            path:'products.productId',
            model: 'Product'
        })
        .then(orders => {
            console.log(orders);
        })
        .catch(err => {
            console.error(err);
        });

        res.status(200).json(totals);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {status};