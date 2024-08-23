const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const { signUp, login } = require('../controllers/userSide/userController');
const { allProducts, productWithId, productWithCategory } = require('../controllers/userSide/productsController');
const { addToCart, displayAllCart } = require('../controllers/userSide/cartController');
const { addToWish, allWishList, deleteWish } = require('../controllers/userSide/wishListController');
const { orderAItem } = require('../controllers/userSide/orderController');


const userRouter = express.Router();

userRouter.post('/register', signUp);

userRouter.post('/login', login);

userRouter.get('/products',checkAuth, allProducts);

userRouter.get('/products/:id', productWithId);

userRouter.get('/products/category/:id', productWithCategory);

// Add to cart 
userRouter.post('/:id/cart', addToCart);

// Showing all cart 
userRouter.get('/:id/cart', displayAllCart);;

// Add to wish list 
userRouter.post('/:id/wishlist', addToWish);

// Show all wish list 
userRouter.get('/:id/wishlist', allWishList);

// Deleting from wishlist
userRouter.delete('/:id/wishlist', deleteWish);

userRouter.post('/:id/orders', orderAItem);

module.exports = userRouter;