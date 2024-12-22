const Order = require("../models/order");
const productService = require("../services/product");
const Product = require("../models/product");

const Cart = require('../models/cart');


async function UpdateDatabaseItemsCounts(orderId) {
    try {
  
    const order= await Order.findById(orderId);
    const items = order.items;
      for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
  
        const quantity = product.stock - item.quantity
        product.stock = quantity
        await productService.updateProduct(product._id, product);
  
      }
      clearBasket(order.userId);
      return true;


    } catch (error) {
      console.log(error);
      return false;
    }
  
  }
  
  async function clearBasket(userId) {
    try {
        const cart = await Cart.findOne({ userId });
        cart.items = [];
        await cart.save();
          return true;
    
    
        } catch (error) {
          console.log(error);
          return false;
        }
      
      }
  
  

  module.exports = {
    UpdateDatabaseItemsCounts,
  };



