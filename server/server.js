require('dotenv').config(); // Load environment variables from .env file

const blueColor = '\x1b[34m'; // Blue color
const greenColor = '\x1b[32m'; // Green color
const redColor = '\x1b[31m'; // Red color
const yellowColor = '\x1b[33m'; // Yellow color
const resetColor = '\x1b[0m'; // Reset color

// Create a function to format the text with the specified color
function colorizeText(text, color) {
  return `${color}${text}${resetColor}`;
}

const express = require('express'); // import express
const app = express(); // create express app

app.use(express.static('assets')); // serve static files from public folder

const http = require('http').Server(app); // import http module and pass express app to it
const serverSocket = require('socket.io')(http); // import socket.io and pass the http object (server)

const port = process.env.PORT || 7000;

http.listen(port, function () {
    console.log(colorizeText(`Server is listening on port ${port}`, greenColor));
});

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

// Create a function to log the message to the console
serverSocket.on('connection', function (socket) {
    console.log(colorizeText('Client connected with id: ' + socket.id, blueColor));
    
    // Create a function to log the message to the console
    socket.on('disconnect', function () {
        console.log(colorizeText('Client disconnected with id: ' + socket.id, redColor));
    });
});