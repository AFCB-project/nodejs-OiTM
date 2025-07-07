// index.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: process.env.PORT || 8080 });

let clients = [];

server.on('connection', ws => {
  clients.push(ws);

  ws.on('message', msg => {
    for (let client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    }
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});
