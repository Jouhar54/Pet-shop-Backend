const orderSchema = require("../models/orderSchema");

// Order an item 
const orderAItem = async (req, res) => {
    try {
        const userId = req.params.id;
        const { productId } = req.body;
        let ordersList = await orderSchema.findOne({ userId });

        if (!ordersList) {
            ordersList = new orderSchema({
                userId,
                products: [
                    { productId, quantity: 1 }
                ]
            })
        }else{
            const productInOrder = await ordersList.products.find(product => product.productId.toString() == productId)
            if(productInOrder){
                productInOrder.quantity += 1;
            }else{
                ordersList.products.push({ productId, quantity:1 });
            }
        }
        
        await ordersList.save();

        res.status(200).json(ordersList)
    } catch (error) {
        res.status(400).json({ message: `Failed ${error.message}` })
    }
}

module.exports = {orderAItem}