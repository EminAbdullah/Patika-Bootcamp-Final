require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const { Kafka } = require("kafkajs");
const processBilling = require("./processBilling"); 

const kafka = new Kafka({
  clientId: "billing-service",
  brokers: ["kafka:29092"],
});

const producer = kafka.producer();
(async () => {
  await producer.connect();
})();

const consumer = kafka.consumer({ groupId: "billing-service-group" });

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "billing_process", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const paymentData = JSON.parse(message.value.toString());
      console.log("Billing service received:", paymentData);

      if ( await processBilling(paymentData)) {
        sendBillingResult({msg:"Fatura işlemi başarılı",isSucces:true,userId:paymentData.userId,orderId:paymentData.orderId});
      }
      else{
        sendBillingResult({msg:"Fatura işlemi başarısız",isSucces:false,userId:paymentData.userId,orderId:paymentData.orderId});
      }
    },
  });
})();


const sendBillingResult = async (result) => {
  try {
    await producer.send({
      topic: 'billing_process_result',
      messages: [{
        value: JSON.stringify({
         result
        }),
      },]
    });
    console.log(result.msg);
  } catch (error) {
    console.error(error);
  }
};