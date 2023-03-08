
# Socket.io Implementation


Take in count this example have front end and the back end part and you have to implement both. 
 
## Documentation

[Documentation](https://socket.io/docs/v4/)


## Appendix
Socket.io uses WebSockets Protocol. 
Http is a protocol diferent from Websocket protocol.

A WebSocket connection is initiated by sending a WebSocket handshake request from a browser’s HTTP connection to a server to upgrade the connection.

From that point, the connection is binary and does not conform to HTTP protocol. A server application is aware of all WebSocket connections and can communicate with each one individually.
As WebSocket remains open, either the server or the user can send messages at any time until one of them closes the session.
The communication can be initiated at either end, which makes event-driven web programming possible. In contrast, standard HTTP allows only users to request new data.
