const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number, // Epoch time (integer)
    default: () => Math.floor(Date.now() / 1000), // Saniye cinsinden Unix timestamp
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
