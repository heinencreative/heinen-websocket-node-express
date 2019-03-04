const WebSocket = require('ws');
const Joi = require('joi');

module.exports = function(server) {
  // Validation schema
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    message: Joi.string().required()
  })

  // Initialize websocket server
  const wss = new WebSocket.Server({ server });

  wss.on('connection', function(ws){

      // Listen for incomming messages
      ws.on('message', function(data) {
        const {error} = Joi.validate(data, schema);

        if (!error) {
          var {username, message} = JSON.parse(data)

          // Broadcast to other clients
          wss.clients
              .forEach(function(client) {
                  if (client != ws) {
                      client.send(`${username}: ${message}`);
                  }
              });

          // Send modified message back to sender
          ws.send(`${username}: ${message}`);
        } else {
          console.log('error', error.details) // TODO Remove
        }
      });

      // Send initial message on connection  
      ws.send('Hi there, welcome to the chat room!');
  });
}