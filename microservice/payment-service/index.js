const mongoose = require("mongoose");
require("dotenv").config();
const { Kafka } = require("kafkajs");
 const processPayment = require("./processPayment"); // Ödeme logic'i

mongoose.connect(process.env.MONGODB_URI);
const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["kafka:29092"],

});

const producer = kafka.producer();
(async () => {
  await producer.connect();
})();

const sendPaymentresult = async (paymentResult) => {
  try {
    await producer.send({
      topic: 'payment_result',
      messages: [{
        value: JSON.stringify({
         paymentResult
        }),
      },]
      
    });
    console.log(paymentResult);
  } catch (error) {
    console.error(error);
  }
};


const consumer = kafka.consumer({ groupId: "payment-service-group" });

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topics: ["order_created"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const orderData = JSON.parse(message.value.toString());
      console.log("Payment service received:", orderData);

      const res =await processPayment(orderData)
      if (res.success) {
        sendPaymentresult({msg:"ödeme işlemi başarılı",isSucces:true,userId:orderData.userId});
      }
      else{
        sendPaymentresult({msg:"ödeme işlemi başarısız",isSucces:false,userId:orderData.userId});
      }
     
    },
  });
})();