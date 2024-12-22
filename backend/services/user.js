const User = require("../models/user");

exports.getUserById = async (id) => {
  const user = await User.findById(id).select("-password"); 
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

exports.getAllUsers = async () => {
  return await User.find().select("-password"); 
};

exports.updateUser = async (id, data) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: data }, 
    { new: true, runValidators: true } 
  ).select("-password");
  return updatedUser;
};

// Kullanıcıyı sil
exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
