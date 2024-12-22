const { Kafka } = require("kafkajs");
const WebSocket = require('ws');
const { UpdateDatabaseItemsCounts } = require("../controllers/ddd");


const wss = new WebSocket.Server({ port: 5555 });

// Bağlı istemcileri takip etmek için bir koleksiyon oluştur
const clients = new Map();

wss.on('connection', (ws) => {
    console.log('Yeni bir istemci bağlandı.');

    // İstemcinin kimliği (örneğin, bağlantı sırasında bir ID gönderilmesi gerekiyor)
    let clientId = null;

    // Gelen mesajları dinle (Örneğin, istemci kimlik bilgisini gönderebilir)
    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.type === "register") {
                clientId = parsedMessage.clientId;
                clients.set(clientId, ws);
                console.log(`İstemci kaydedildi: ${clientId}`);
            }
        } catch (err) {
            console.error("Mesaj çözümlemesi başarısız:", err);
        }
    });

    // Bağlantı kapandığında istemciyi kaldır
    ws.on('close', () => {
        if (clientId) {
            clients.delete(clientId);
            console.log(`İstemci bağlantısı kapatıldı: ${clientId}`);
        }
    });
});

// Kafka ayarları
const kafka = new Kafka({
    clientId: "backend-service",
    brokers: ["kafka:29092"], // docker-compose içindeki kafka servisine uygun host:port
});

const producer = kafka.producer();

async function connectProducer() {
    await producer.connect();
}
connectProducer().catch(console.error);

async function sendOrderCreatedEvent(orderData) {
    await producer.send({
        topic: "order_created",
        messages: [{ value: JSON.stringify(orderData) }],
    });
}

const consumer = kafka.consumer({ groupId: "billing_process" });

(async () => {
    await consumer.connect();
    await consumer.subscribe({ topics: ["billing_process_result", "payment_result"], fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            let result = JSON.parse(message.value.toString());
            console.log(`Kafka'dan mesaj alındı (${topic}):`, result);

            // Kafka mesajlarını belirli istemcilere ilet
            if (topic === "billing_process_result" ) {
             
                const ws = clients.get(result.result.userId);
                if (ws && ws.readyState === WebSocket.OPEN) {
                  console.log("backendden billing result gönderildi")
                  if (result.result.isSucces) {
                     UpdateDatabaseItemsCounts(result.result.orderId);
                  }

                    ws.send(JSON.stringify({ type: "billing_result", data: result }));
                }
            } else if (topic === "payment_result" ) {
           
                const ws = clients.get(result.paymentResult.userId);
                if (ws && ws.readyState === WebSocket.OPEN) {
                  console.log("backendden payment result gönderildi")
                    ws.send(JSON.stringify({ type: "payment_result", data: result }));
                }
            }
        },
    });
})();

module.exports = { sendOrderCreatedEvent };