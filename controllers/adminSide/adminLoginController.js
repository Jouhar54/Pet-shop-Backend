const userSchema = require("../../models/userSchema");
const { comparePassword } = require("../../utils/bcrypt");
const { generateAccessToken } = require("../../utils/jwt");

// Login 
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(password == process.env.ADMIN_PASSWORD && email == process.env.ADMIN_EMAIL){
            const accessToken = generateAccessToken(email);
            return res.status(200).json({username: email, accessToken});
        }else{
            return res.status(500).json({message:`You aren't an admin`});
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {adminLogin}