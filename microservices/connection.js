'use strict';

const amqplib = require('amqplib');

const url = process.env.AMQP_URL || 'amqp://lbzlvzhw:xqXysEhQtJR-lLeiQjF3h74RPzc3LpHc@lark.rmq.cloudamqp.com/lbzlvzhw';

const connectionPromise = amqplib.connect(url)
    .catch(err => {
        console.log('[queueConnection]', err);
    });

module.exports = connectionPromise;