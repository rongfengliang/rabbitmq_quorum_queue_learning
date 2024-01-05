# rabbitmq  quorum-queues docker learning

> with harcode cookie not used production environment

## int clutser

* test command

```code
rabbitmq-diagnostics --node rabbitmq@rabbitmq  --erlang-cookie dalongdemo
rabbitmq-diagnostics --node rabbitmqv2@rabbitmqv2 --erlang-cookie dalongdemo
rabbitmq-diagnostics --node rabbitmqv3@rabbitmqv3 --erlang-cookie dalongdemo

```

* join cluster

```code
// add  rabbitmqv2 node
rabbitmqctl stop_app

rabbitmqctl reset

rabbitmqctl join_cluster rabbitmq@rabbitmq

rabbitmqctl start_app

// view cluster info in  rabbitmq or rabbitmqv2

rabbitmqctl cluster_status

// add rabbitmqv3 node

rabbitmqctl stop_app

rabbitmqctl reset

rabbitmqctl join_cluster rabbitmqv2@rabbitmqv2

rabbitmqctl start_app

// view cluster info  in  rabbitmq or rabbitmqv2  or rabbitmqv3


rabbitmqctl cluster_status


// change cluster name


rabbitmqctl set_cluster_name  mymq_cluster
 
```

## add quorum-queues

* create quorum queues

![images](./images/WX20240105-094335@2x.png)

* view quorum queue status

```cide
rabbitmq-queues  quorum_status mydemo
```
![images](./images/WX20240105-094922@2x.png)


## do code testing

> with three client

```code
var q = 'mydemo';

var open = require('amqplib').connect('amqp://admin:admin@127.0.0.1:5672/');

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
```