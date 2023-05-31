const express = require('express'); // import express
const app = express(); // create express app

const http = require('http').Server(app); // import http module and pass express app to it
const serverSocket = require('socket.io')(http); // import socket.io and pass the http object (server)