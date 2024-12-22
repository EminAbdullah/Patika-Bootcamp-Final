// services/cart.js

const Cart = require('../models/cart');
const Product = require('../models/product');

// Mevcut addToCart ve getCart fonksiyonları...

exports.addToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find(item => item.productId.toString() === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();

  // Populate productId before returning
  await cart.populate('items.productId');
  return cart;
};

exports.updateCartItem = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Sepet bulunamadı");

  const item = cart.items.find(item => item.productId.toString() === productId);
  if (!item) throw new Error("Ürün sepetinizde yok");

  if (quantity <= 0) {
    // Eğer miktar 0 veya daha azsa, ürünü sepetten çıkar
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
  } else {
    // Miktarı güncelle
    item.quantity = quantity;
  }

  await cart.save();

  // Populate productId before returning
  await cart.populate('items.productId');
  return cart;
};

exports.removeCartItem = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Sepet bulunamadı");

  const itemExists = cart.items.some(item => item.productId.toString() === productId);
  if (!itemExists) throw new Error("Ürün sepetinizde yok");

  cart.items = cart.items.filter(item => item.productId.toString() !== productId);
  await cart.save();

  // Populate productId before returning
  await cart.populate('items.productId');
  return cart;
};

exports.getCart = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate('items.productId');
  return cart;
};
