const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["created", "sent", "paid"],
    default: "created",
  },
  createdAt: {
    type: Number, // Epoch time (integer)
    default: () => Math.floor(Date.now() / 1000), // Saniye cinsinden Unix timestamp
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
