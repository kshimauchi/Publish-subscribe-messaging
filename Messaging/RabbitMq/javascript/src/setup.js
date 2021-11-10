const amqp = require('amqplib');

const rabbitConfig = {
    protocol: process.env.DEV_RABBIT_PROTOCOL,
    hostname: process.env.DEV_RABBIT_HOSTNAME,
    port: process.env.DEV_RABBIT_PORT,
    username: process.env.DEV_RABBIT_USER,
    password: process.env.DEV_RABBIT_CREDENTIAL,
    vhost: process.env.DEV_RABBIT_VHOST,
    authMechanism: process.env.DEV_RABBIT_AUTH_MECHANISM,
}
exports.rabbitConfig = rabbitConfig;