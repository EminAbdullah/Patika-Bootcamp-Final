const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String , required: true }, 
    price: { type: Number, required: true }, 
    stock: { type: Number, default: 0 }, 
    category: {
      type: String,
      enum: ["figure", "artprints", "none"], 
      default: "none",
    },
    theme: {
      type: String,
      enum: ["anime", "marvel", "dc","star wars", "none"],
      default: "none",
    },
    images: [
        {
            type: String,
        }
    ]
  },
  { timestamps: true }
);

productSchema.path('images').validate(function (value) {
    return value.length > 0;
  }, 'At least one image is required.');

module.exports = mongoose.model("Product", productSchema);
