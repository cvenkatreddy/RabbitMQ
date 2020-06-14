const amqp = require("amqplib");

connect();
async function connect() {

    try {
        const connection = await amqp.connect("amqp://192.168.99.100:5672")
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("users");
        
        channel.consume("users", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved message: ${JSON.stringify(input)}`)
            
        })

        console.log("Waiting for messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}



