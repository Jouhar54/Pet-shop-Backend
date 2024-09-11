const Stripe = require("stripe");
const orderSchema = require("../../models/orderSchema");
const cartSchema = require("../../models/cartSchema");
const userSchema = require("../../models/userSchema");
const mongoose = require("mongoose");
require("dotenv").config();

const stripeKey = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripeKey);

const payment = async (req, res) => {
  try {
    const { email, userId } = req.body;
    const cartItems = await cartSchema
    .findOne({ userId }).populate({
      path:'products._id',
      model: 'Product'
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.products.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item._id.name,
            images: [item._id.imageSrc],
          },
          unit_amount: item._id.price * 100,
        },
        quantity: item._id.quantity,
      })),
      mode: "payment",
      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173/cancel`,
      customer_email: email,
    });

    if (!session) {
      return res.status(400).json({
        status: "fail",
        message: "Error on session side",
      });
    }

    const completeOrder = new orderSchema({
      userId,
      products: cartItems.products.map((item) =>({
        productId: item._id._id,
        quantity: item.quantity,
      })),
      order_id: session.id,
      payment_id: userId+Date.now(),
      total_amount: session.amount_total / 100,
      status: "Success",
    });
    await completeOrder.save();

    if(completeOrder){
      await cartSchema.deleteOne({userId});
    }

    res.json({ status: "success", url: session.url, id: session.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { payment };