const express = require('express');
const userSchema = require('../models/userSchema');
const productSchema = require('../models/productSchema');
const cartSchema = require('../models/cartSchema');
const wishSchema = require('../models/wishSchema');
const { generateAccessToken } = require('../utils/jwt');
const {generateHashedPassword, comparePassword} = require('../utils/bcrypt');
const checkAuth = require('../middleware/checkAuth');

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await userSchema.findOne({email});

        // Checking if user existed
        if(existingUser){
            return res.status(400).json({message:`You are already our family`});
        }
        // Validating user credentials
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All field are required' })
        }

        // Validating email formate
        const emailFormate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormate.test(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        // hashing 
        const hashedPassword = await generateHashedPassword(password)

        // Saving the user
        const user = new userSchema({ username, email, password:hashedPassword });
        user.save();
        return res.status(200).json({ message: 'Success' });

    } catch (error) {
        return res.status(400).json({ message: `Bad request:  ${error.message}` });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({email})
        if(!user){
            return res.status(404).json({message:`Create a new account`});
        }

        // checking is the user real 
        const validPassword = comparePassword(password, user.password)
        if(!validPassword){
            return res.status(400).json({message:`Incorrect user name or password`});
        }

        // Token generation
        const accessToken = generateAccessToken(user.id);

        return res.status(200).json({username: user.username, accessToken});
    } catch (error) {
        console.log(error);
    }
})

// All products 
userRouter.get('/products',checkAuth, async (req, res) => {
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
        const cart = await cartSchema.findOne({ userId }).populate('products.productId')

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
        const wishlist = await wishSchema.findOne({ userId }).populate('products.productId');

        if (!wishlist) {
            return res.status(400).json({ message: `You don't have any Wish list` })
        }
        res.status(200).json(wishlist.products);
    } catch (error) {
        res.status(400).json({ message: `Sever error` });
    }
})

// Deleting from wishlist
userRouter.delete('/:id/wishlist', async (req, res) => {
    try {
        const userId = req.params.id;
        const productId = req.body;
        const wishlist = await wishSchema.findOne({ userId });
        const deleted = await wishlist.deleteOne({ productId });

        if (!deleted) {
            res.status(400).json({ message: `this product is not available in your wishlist` })
        }
        res.status(200).json(`Product removed`);
    } catch (error) {
        res.status(400).json({ message: `server error ${error.message}` });
    }

})

module.exports = userRouter;