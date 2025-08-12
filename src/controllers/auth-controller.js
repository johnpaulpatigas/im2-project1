// src/controllers/auth-controller.js
const User = require("../models/auth-model");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const errors = [];
  if (!name) errors.push({ field: "name", message: "Name is required." });
  if (!email) errors.push({ field: "email", message: "Email is required." });
  if (!password)
    errors.push({ field: "password", message: "Password is required." });
  if (password && password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters.",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const emailExists = await User.findUserByEmail(email);
    if (emailExists) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.createUser(name, email, hashedPassword);

    res.status(201).json({ message: "User has been created successfully." });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: `Welcome ${user.name}!` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
