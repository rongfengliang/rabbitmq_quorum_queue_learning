var q = 'mydemo';

var open = require('amqplib').connect('amqp://admin:admin@127.0.0.1:5673/');


// Consumer
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
    return ch.consume(q, function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
}).catch(console.warn);