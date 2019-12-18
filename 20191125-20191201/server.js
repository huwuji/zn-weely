
// File: debugClient.js
const net = require('net');

const socket = net.createConnection(5858, '127.0.0.1');
socket.on('data', (data) => {
    console.log(data.toString())
});

process.stdin.on('data', (data) => {
    const json = data.toString();
    const msg = `Content-Length: ${Buffer.byteLength(json, 'utf8')}\r\n\r\n${json}`;
    socket.write(msg, 'utf8');
});
s