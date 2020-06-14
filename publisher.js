const amqp = require("amqplib");

const message =  {
    "username": "netrefer",
    "email": "message@netrefer.com",
    "age": 15,
    "authorization": "normal"
}
connect();
async function connect() {

    try {
        const connection = await amqp.connect("amqp://192.168.99.100:5672")
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("users");
        channel.sendToQueue("users", Buffer.from(JSON.stringify(message)))
        console.log(`Message sent successfully: ${JSON.stringify(message)}`);
    }
    catch (ex){
        console.error(ex)
    }

}