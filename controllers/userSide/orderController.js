const orderSchema = require("../../models/orderSchema");

// Display all Orders
const allOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    const order = await orderSchema.find({ userId }).populate({
      path: "products.productId",
      model: "Product",
    });
    if (!order) {
      return res.status(400).json({ message: `Order not found` });
    }
    res
      .status(200)
      .json({ success: true, message: `Order fetched`, data: order });
  } catch (error) {
    res.status(400).json({ message: `Fetching Failed ${error.message}` });
  }
};

module.exports = { allOrders };