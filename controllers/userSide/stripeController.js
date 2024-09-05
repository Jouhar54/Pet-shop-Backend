const Stripe = require("stripe");
const orderSchema = require("../../models/orderSchema");
const cartSchema = require("../../models/cartSchema");
const stripe = Stripe(
  "sk_test_51PusIoCG06gOJ3clnNVDNPaFp0ajrMjldZGKFMcykqByQ98o1LEKj3eP3TcQ3QogU65aJjVaMm3ax22d1skG79t100COGlTV2d"
);

const payment = async (req, res) => {
  try {
    const { cartItems, email } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [item.imageSrc],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `http://localhost:5173/`,
      cancel_url: `http://localhost:5173/cancel`,
      customer_email: email,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const orderAdding = async (req, res) => {
  const { paymentIntentId, userId, cartItems } = req.body;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status === "succeeded") {
    const newOrder = new orderSchema({
      userId,
      products: cartItems,
      totalPrice: paymentIntent.amount,
      paymentStatus: "Completed",
    });

    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });

    await cartSchema.findOneAndUpdate({ userId }, { $set: { products: [] } });
  } else {
    res.status(400).json({ success: false, message: "Payment failed" });
  }
};

module.exports = { payment, orderAdding };
