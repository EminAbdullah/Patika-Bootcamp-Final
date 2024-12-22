const Payment = require('./models/Payment'); // Payment modeli
const { Kafka } = require('kafkajs');

// Kafka Producer'ı başlat
const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: ['kafka:29092']
});
const producer = kafka.producer();
(async () => {
  await producer.connect();
})();

const sendPaymentProcessedEvent = async (paymentResult) => {
  try {
    await producer.send({
      topic: 'billing_process',
      messages: [
        {
          value: JSON.stringify({
            orderId: paymentResult.orderId,
            userId: paymentResult.userId,
            success: paymentResult.success,
            transactionId: paymentResult.transactionId || null,
          }),
        },
      ],
    });
    console.log('Payment processed event sent:', paymentResult);
  } catch (error) {
    console.error('Error sending payment processed event:', error);
  }
};


const processPayment = async (orderData) => {
  try {
    const { orderId, totalAmount,items ,userId} = orderData;

    // Ödeme işlemini simüle edelim
    const paymentMethod = 'credit_card'; // Ödeme yöntemi sabit veya dinamik olabilir
    const currency = 'USD'; // Para birimi (örn: USD)
    const status = 'completed'; // Ödeme başarılı varsayıyoruz
   
    // Payment modeline kaydetmek için yeni bir ödeme kaydı oluşturalım
    const payment = new Payment({
      orderId,
      amount: totalAmount,
      currency,
      status,
      paymentMethod, //TODO yapılacak createAt olması lazım veri tipi Date değil timestampt olsun... 
    });

    // MongoDB'ye kaydet
    const savedPayment = await payment.save();

    console.log('Payment saved successfully:', savedPayment);

    // Kafka'ya mesaj gönder
    await sendPaymentProcessedEvent({
      orderId: orderId,
      success: true,
      userId:userId,
      transactionId: savedPayment._id.toString(),
    });

    // Ödeme başarılı sonucu döndür
    return {
      success: true,
      transactionId: savedPayment._id.toString(),
    };
  } catch (error) {
    console.error('Error processing payment:', error);

    // Kafka'ya hata mesajı göndermek isterseniz buraya ekleyebilirsiniz
    await sendPaymentProcessedEvent({
      orderId: orderData.orderId,
      success: false,
      transactionId: null,
    });

    return {
      success: false,
      transactionId: null,
    };
  }
};

module.exports = processPayment;
