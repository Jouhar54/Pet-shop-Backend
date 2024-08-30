const userSchema = require("../../models/userSchema");
const {
  generateHashedPassword,
  comparePassword,
} = require("../../utils/bcrypt");
const { generateAccessToken } = require("../../utils/jwt");

// Signup
const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userSchema.findOne({ email });

    // Checking if user existed
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: `You are already our family` });
    }
    // Validating user credentials
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All field are required" });
    }

    if (username.trim().length === 0 || password.trim().length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Space only not valid" });
    }

    // Validating email formate
    const emailFormate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormate.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    // hashing
    const hashedPassword = await generateHashedPassword(password);

    // Saving the user
    const user = new userSchema({ username, email, password: hashedPassword });
    user.save();
    res.status(200).json({ success: true, message: "Success", data: user });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: `Bad request:  ${error.message}` });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: `Create a new account` });
    }

    // checking is the user real
    const validPassword = comparePassword(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: `Incorrect user name or password` });
    }

    // Token generation
    const accessToken = generateAccessToken(user.id);
    res
      .status(200)
      .json({ success: true, data: user, accessToken });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server error ${error.message}` });
  }
};

module.exports = { signUp, login };
