// Desc: Server for the TextSync - A Realtime Distributed Text Editor.

// This loads the .env file from the root directory of the server.
require('dotenv').config({ path: './.env' });

// Import the 'socket.io' package
const io = require('socket.io')(server, {
    // Configure Cross-Origin Resource Sharing (CORS)
    cors: {
      // Define the allowed origin for cross-origin requests
      origin: "http://localhost:3000",
      // Specify the allowed HTTP methods for cross-origin requests
      methods: ["GET", "POST"]
    }
  });
  
// io.on is a listener for incoming connections
io.on('connection', (socket) => {});