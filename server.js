// Code for Yi Mobile intership test
// Developed by Victor Vieira

// Server

// Setting the modules/variables for the server
const http = require('http');
const port = process.env.PORT || 8080; // if there's no port set as environment variable, the port used will be 8080
const app = require('./app');

const server = http.createServer(app);

server.listen(port);
