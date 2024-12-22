const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const productRouter= require("./product");
const cartRouter= require("./cart");
const orderRouter= require("./order");

const router = express.Router();
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products",productRouter);
router.use("/cart",cartRouter)
router.use("/order",orderRouter)

module.exports = router;
