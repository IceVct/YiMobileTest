// Code for Yi Mobile intership test
// Developed by Victor Vieira

// Server

// Setting the modules/variables for the server
const http = require('http');
const port = 8080; 
const app = require('./app');

const server = http.createServer(app);

server.listen(port);
console.log('API working');
