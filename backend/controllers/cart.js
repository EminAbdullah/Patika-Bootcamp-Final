const cartService = require('../services/cart');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const cart = await cartService.addToCart(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await cartService.getCart(userId);
    if (!cart) return res.status(404).json({ message: "Cart is empty" });
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const cart = await cartService.updateCartItem(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await cartService.removeCartItem(userId, productId);
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ error: error.message });
  }
};


