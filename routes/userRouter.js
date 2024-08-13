const express = require('express');
const userSchema = require('../models/userSchema');
const productSchema = require('../models/productSchema');

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
    const productById = await productSchema.find({title:productId});

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
        const productsWithCategory = await productSchema.find( {category: categoryId });

        if (!productsWithCategory) {
            res.status(400).json({ message: "Category not exist" })
        }
        res.status(200).json(productsWithCategory);
    } catch (error) {
        res.status(400).json({ message: `Server issue ${error.message}` });
    }
})



module.exports = userRouter;