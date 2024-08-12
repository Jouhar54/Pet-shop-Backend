const express = require('express');
const userLoginSchema = require('../models/userSchema');
const userSchema = require('../models/userSchema');

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await new userSchema({ username, email, password });
        user.save();
        return res.status(200).json('Success');
    } catch (error) {
        return res.status(400).json(`Bad request:  ${error.message}`);
    }
});

userRouter.post('/login', async (req, res)=>{
    try {
        const {email, password} = req.body;
        const login = await userSchema.find({email, password})
        return res.status(200).json("Logged");
    } catch (error) {
        console.log(error);
    }
})




module.exports = userRouter;