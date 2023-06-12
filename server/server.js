// Desc: Server for the TextSync - A Realtime Distributed Text Editor.

// This loads the .env file from the root directory of the server.
require("dotenv").config({ path: "./.env" });

// Import the 'http' package
const server = require("http").createServer();
server.listen(process.env.SERVER_PORT, () => {
   console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});

// Import the 'socket.io' package
const io = require("socket.io")(server, {
   // Configure Cross-Origin Resource Sharing (CORS)
   cors: {
   // Define the allowed origin for cross-origin requests
   origin: `${process.env.CLIENT_ADDRESS}:${process.env.CLIENT_PORT}`,
   // Specify the allowed HTTP methods for cross-origin requests
   methods: ["GET", "POST"],
   }
});
  
// io.on is a listener for incoming connections
io.on("connection", socket => { // socket is an object that represents the client
   socket.on("get-document", documentId => { // documentId is the id of the document
      const data = ""; // TODO: Get document from database
      socket.join(documentId); // join the room identified by the documentId
      socket.emit("load-document", data); // emit a 'load-document' event to the client
   });

   socket.on("send-changes", delta => { // delta is the change in the text
      socket.broadcast.emit("receive-changes", delta); // broadcast the change to all other clients, except the sender
   })
});