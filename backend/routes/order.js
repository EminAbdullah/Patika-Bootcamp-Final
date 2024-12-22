const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const orderController = require("../controllers/order");
const isAdmin = require("../middlewares/isAdmin");

router.post('/create', authMiddleware,orderController.createOrder);
router.get('/', authMiddleware, isAdmin,orderController.getAllOrders);

module.exports = router;



