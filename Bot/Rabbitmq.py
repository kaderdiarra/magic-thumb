import pika
import json
from typing import Any

#Error code
    # 404 not found
    # 500 internal error


EXCHANGE_NAME="operation"

class Rabbitmq:
    def __init__(self, updatePosts, removePosts) -> None:
        connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
        self.updatePosts = updatePosts
        self.removePosts = removePosts
        self.channel = connection.channel()
        self.channel.exchange_declare(exchange=EXCHANGE_NAME, exchange_type="direct")
        self.initQueues()

    def __del__(self):
        self.channel.close()

    def createQueue(self, name: str, routingKey: str, callback: callable):
        queue = self.channel.queue_declare(name)
        queueName = queue.method.queue
        self.channel.queue_bind(
            exchange=EXCHANGE_NAME,
            queue=queueName,
            routing_key=EXCHANGE_NAME + "." + routingKey,
        )
        self.channel.basic_consume(queue=queueName, on_message_callback=callback)
        print(f'[*] Queue: "{queueName}" start consuming...')

    def initQueues(self):
        self.createQueue(name="operation_task", routingKey="task", callback=self.taskQueueCallback)

    def taskQueueCallback(self, ch, method, properties, body):
        payload = json.loads(body)
        print("PAYLOAD:", payload)
        title = payload.get("title")
        data = payload.get("data")
        match title:
            case "update_posts":
                self.executeMethod(method=self.updatePosts, ch=ch, callbackMethod=method, title=title, data=data)
            case "remove_posts":
                self.executeMethod(method=self.removePosts, ch=ch, callbackMethod=method, title=title, data=data)
            case _:
                errorInfo = {
                    "msg": "title: {title} does not exist",
                    "code": 404,
                }
                self.publish(routingKey="operation.result", title="error", data=errorInfo)

    def publish(self, routingKey: str, title: str, data=None) -> None:
        self.channel.basic_publish(
            exchange=EXCHANGE_NAME,
            routing_key=routingKey,
            body=json.dumps({"title": title, "data": data})
        )
        print(f'[x] Send message with title: "{title}" to: [{routingKey}]')

    def consume(self):
        self.channel.start_consuming()

    def executeMethod(self, method: callable, ch: Any, callbackMethod: Any, title: str, data=None):
        try:
            method(data)
            ch.basic_ack(delivery_tag=callbackMethod.delivery_tag)
            self.publish(routingKey="operation.result", title="update_posts_succed")
            print(f'[x] Message "[{title}]" has [SUCCED ✅]')
        except Exception as e:
            print(e)
            print(f'[x] Message "{title}" has [FAILED ❌]')
            errorInfo = {
                "msg": "internal error",
                "code": 500,
                "sendedMessageInfo": {
                    "title": title,
                    "data": data,
                }
            }
            self.publish(routingKey="operation.result", title="error", data=errorInfo)
