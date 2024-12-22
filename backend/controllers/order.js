const Order = require("../models/order");
const Product = require("../models/product");
const { sendOrderCreatedEvent } = require("../kafka/kafkaProcess");
const productService = require("../services/product");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    let calculatedTotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const itemTotal = product.price * item.quantity;
      calculatedTotal += itemTotal;

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price, // price alanını burada ekliyoruz
      });
    }

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount: calculatedTotal,
      status: "CREATED",
    });
    await order.save();



    // Kafka'ya sipariş oluşturuldu mesajı
    await sendOrderCreatedEvent({
      orderId: order._id.toString(),
      userId: userId,
      totalAmount: calculatedTotal,
      items: orderItems.map((i) => ({
        productId: i.productId.toString(),
        quantity: i.quantity,
        price: i.price,
      })),
    });

    res.status(200).json({ message: "Order created", orderId: order._id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    // Tüm siparişleri çekiyoruz ve ilgili kullanıcı ve ürün bilgilerini populate ediyoruz
    const orders = await Order.find()
      .populate('userId', 'name email') // User modelindeki name ve email alanlarını getirir
      .populate('items.productId', 'name price'); // Product modelindeki name ve price alanlarını getirir

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
};


