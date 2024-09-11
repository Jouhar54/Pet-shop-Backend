const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const { signUp, login } = require('../controllers/userSide/userController');
const { allProducts, productWithId, productWithCategory } = require('../controllers/userSide/productsController');
const { addToCart, displayAllCart, deleteCart } = require('../controllers/userSide/cartController');
const { addToWish, allWishList, deleteWish } = require('../controllers/userSide/wishListController');
const { payment } = require('../controllers/userSide/stripeController');


const userRouter = express.Router();

// Registration and Login
userRouter.post('/register', signUp);
userRouter.post('/login', login);

// Handling Products
userRouter.get('/products', allProducts);
userRouter.get('/products/:id', productWithId);
userRouter.get('/products/category/:id', productWithCategory);

// cart handlings
userRouter.post('/:id/cart',checkAuth, addToCart);
userRouter.get('/:id/cart',checkAuth, displayAllCart);
userRouter.delete('/:id/cart',checkAuth, deleteCart);

// Handling wish list 
userRouter.post('/:id/wishlist',checkAuth, addToWish);
userRouter.get('/:id/wishlist',checkAuth, allWishList);
userRouter.delete('/:id/wishlist',checkAuth, deleteWish);

userRouter.post('/create-checkout-session',checkAuth, payment)
// userRouter.get('/success',checkAuth, successPayment)
// userRouter.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = userRouter;