const amqp = require('amqplib');
const setupConsumerSettings = require('./setup');


connect();

//simple example of a consumer
async function connect(){
    
    const queue = 'employees';

    const enterprise="Youtube";

try{
        const conn = await amqp.connect(setupConsumerSettings.rabbitConfig);
        console.log('Connection Created...');
    
        const channel  = await conn.createChannel();
        console.log('Channel Created...');

        const res = await channel.assertQueue(queue);
        console.log('Queue Created...');

        console.log(`Waiting for messages from $ { enterprise }`)
        

        channel.consume(queue, message => {
            let employee = JSON.parse(message.content.toString());
        
            console.log(`Received test ${employee.name}`);
            console.log(employee);

            //ack the message to remove from the queue
            if(employee.enterprise == enterprise){
                channel.ack(message);
                console.log('Deleting messages from the queue...\n')
            }else{
                //if not enterpise do 
                console.log("That message is not for me I'll not delete it...");
            }
        })

    } catch(err){
            console.log(`Error -> ${err}`);
    }
};