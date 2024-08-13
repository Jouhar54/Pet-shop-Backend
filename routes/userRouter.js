const express = require('express');
const userSchema = require('../models/userSchema');
const productSchema = require('../models/productSchema');
const cartSchema = require('../models/cartSchema');
const wishSchema = require('../models/wishSchema');

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validating user credentials
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All field are required' })
        }

        // Validating email formate
        const emailFormate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormate.test(email)) {
            res.status(400).json({ message: 'Invalid email address' });
        }

        // Saving the user
        const user = await new userSchema({ username, email, password });
        user.save();
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        return res.status(400).json({ message: `Bad request:  ${error.message}` });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const login = await userSchema.find({ email, password })
        return res.status(200).json(`Logged ${login}`);
    } catch (error) {
        console.log(error);
    }
})

// All products 
userRouter.get('/products', async (req, res) => {
    try {
        const productsList = await productSchema.find();
        res.status(200).json(productsList);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Product with id
userRouter.get('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const productById = await productSchema.findById(productId);

        if (!productById) {
            res.status(400).json({ message: "product not available" });
        }
        res.status(200).json(productById);
    } catch (error) {
        res.status(400).json({ message: `${error.message}` });
    }
});

// Product with category
userRouter.get('/products/category/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const productsWithCategory = await productSchema.find({ category: categoryId });

        if (!productsWithCategory) {
            res.status(400).json({ message: "Category not exist" })
        }
        res.status(200).json(productsWithCategory);
    } catch (error) {
        res.status(400).json({ message: `Server issue ${error.message}` });
    }
})

// Add to cart 
userRouter.post('/:id/cart', async (req, res) => {
    try {
        const userId = req.params.id;
        const { productId, quantity } = req.body;
        let cart = await cartSchema.findOne({ userId });

        if (!cart) {
            cart = new cartSchema({
                userId,
                products: [{ productId, quantity }]
            })
        } else {
            cart.products.push({ productId, quantity });
        }

        await cart.save()

        res.status(200).json({ message: `Product added ${cart}` })
    } catch (error) {
        res.status(400).json({ message: `Failed to add product ${error.message}` })
    }
})

// Showing all cart 
userRouter.get('/:id/cart', async (req, res) => {
    try {
        const userId = req.params.id;
        const cart = await cartSchema.findOne({ userId })

        if (!cart) {
            res.status(400).json({ message: `Cart not found` });
        }
        res.status(200).json(cart.products);
    } catch (error) {
        res.status(400).json({ message: `Fetching Failed ${error.message}` });
    }
});

// Add to wish list 
userRouter.post('/:id/wishlist', async (req, res) => {
    try {
        const userId = req.params.id;
        const { productId } = req.body;
        let wishlist = await wishSchema.findOne({ userId });

        if (!wishlist) {
            wishlist = new wishSchema({
                userId,
                products: [
                    { productId }
                ]
            })
        } else {
            wishlist.products.push({ productId })
        }

        await wishlist.save();

        res.status(200).json(`Added ${wishlist}`)
    } catch (error) {
        res.status(400).json({ message: `Failed ${error.message}` })
    }
})

// Show all wish list 
userRouter.get('/:id/wishlist', async (req, res) => {
    try {
        const userId = req.params.id;
        const wishlist = await wishSchema.findOne({ userId });

        if (!wishlist) {
            res.status(400).json({ message: `You don't have any Wish list` })
        }
        res.status(200).json(`Your loved items are here ${wishlist.products}`);
    } catch (error) {
        res.status(400).json({ message: `Sever error` });
    }
})

module.exports = userRouter;