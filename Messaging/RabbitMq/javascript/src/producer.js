const amqp = require('amqplib');
const setupProducerSettings = require('./setup');


connect();

async function connect(){
    
    const queue = 'employees';
    //Dummy data
    const msgs = [
        {"name": "Programming Youtube", "enterprise": "Youtube"},
        {"name": "Programming Facebook", "enterprise": "Facebook"},
        {"name": "Programming Y", "enterprise": "Youtube"},
        {"name": "Programming F", "enterprise": "Facebook"},
    ]   
try{
        const conn = await amqp.connect(setupProducerSettings.rabbitConfig);
        console.log('Connection Created...');
    
        const channel  = await conn.createChannel();
        console.log('Channel Created...');

        const res = await channel.assertQueue(queue);
        console.log('Queue Created...');



        for(let msg in msgs){
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
            console.log(`Message sent to queue ${queue}`);
        }
    } catch(err){
            console.log(`Error -> ${err}`);
    }
};