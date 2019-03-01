const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

// Initialize http server
const server = http.createServer(app);
const port = process.env.PORT || 8999;

// Initialize websocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', function(ws){

    // Listen for incomming messages
    ws.on('message', function(message) {

        // Broadcast to other clients
        wss.clients
            .forEach(function(client) {
                if (client != ws) {
                    client.send(message);
                }
            });

        // Send modified message back to sender
        ws.send(`Hello, you sent -> ${message}`);
    });

    // Send initial message on connection  
    ws.send('Hi there, welcome to the chat room!');
});

// Start server
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});