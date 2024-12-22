const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const cartController = require("../controllers/cart");

router.post('/add', authMiddleware,cartController.addToCart);

router.get('/', authMiddleware,cartController.getCart );
router.put('/update', authMiddleware, cartController.updateCartItem); 
router.delete('/remove', authMiddleware, cartController.removeCartItem);

module.exports = router;
