const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  return await user.save();
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error("Invalid password");

  return jwt.sign( { id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "8h" });
};
