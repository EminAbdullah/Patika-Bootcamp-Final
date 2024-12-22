const Invoice = require("./models/Invoice");
const { Kafka } = require("kafkajs");

const processBilling = async (orderData) => {
  try {
    const { orderId, transactionId } = orderData;
    const paymentId = transactionId;

    const status = "paid"; // Ödeme başarılı varsayıyoruz

    // Billing modeline kaydetmek için yeni bir ödeme kaydı oluşturalım
    const billing = new Invoice({
      orderId,
      paymentId,
      status,
    });

    // MongoDB'ye kaydet
    const savedBilling = await billing.save();

    console.log("Billing saved successfully:", savedBilling);
   
    return true;
  } catch (error) {
    console.error("Error processing billing:", error);
    return false;
  }
};

module.exports = processBilling;
