const orderSchema = require("../../models/orderSchema")

// Display all orders 
const displayOrders = async (req, res)=>{
    try {
        const orders = await orderSchema.find().populate();

        if(!orders){
            return res.status(404).json({message:`You didn't order anything`});
        }
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {displayOrders};