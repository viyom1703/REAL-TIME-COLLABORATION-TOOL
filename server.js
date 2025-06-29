const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('New client connected');
    // Broadcast any message to all connected clients
    ws.on('message', (message) => {
    const data = JSON.parse(message);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
});
    // Log when a client disconnects
    ws.on('close', () => console.log('Client disconnected'));
});

// Start the server on port 3000
server.listen(3000, () => console.log('Server running on http://localhost:3000'));