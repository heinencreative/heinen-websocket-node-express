const express = require('express');
const http = require('http');
const websocket = require('./websocket')

const app = express();

// Initialize http server
const server = http.createServer(app);
const port = process.env.PORT || 8999;

// Setup the websocket server
websocket(server)

// Start server
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});