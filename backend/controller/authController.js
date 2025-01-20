const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils.js");
const User = require("../models/User.js");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, Email, and Password are required",
      });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "Email already used",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "customer",
    });
    const savedUser = await user.save();
    const token = generateToken(savedUser);
    return res.status(201).json({ token: token, user: savedUser });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Something went wrong during registration.",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        error: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const token = generateToken(user);
    res.status(200).json({ token: token, user: user });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong during login",
    });
  }
};

module.exports = { login, register };
