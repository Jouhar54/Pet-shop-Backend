const cartSchema = require("../../models/cartSchema");

// Add items to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { _id, quantity } = req.body;
    let cart = await cartSchema.findOne({ userId });
    console.log(req.body);
    if (!cart) {
      cart = new cartSchema({
        userId,
        products: [{ _id, quantity }],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (item) => item._id.toString() === _id
      );
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ _id: _id, quantity });
      }
    }

    await cart.save();

    res.status(200).json({ message: `Product added ${cart}` });
  } catch (error) {
    res.status(400).json({ message: `Failed to add product ${error.message}` });
  }
};

// Display all cart items
const displayAllCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const cart = await cartSchema
      .findOne({ userId })
      .populate("products.productId");

    if (!cart) {
      res.status(400).json({ message: `Cart not found` });
    }
    res.status(200).json(cart.products);
  } catch (error) {
    res.status(400).json({ message: `Fetching Failed ${error.message}` });
  }
};

module.exports = { addToCart, displayAllCart };
