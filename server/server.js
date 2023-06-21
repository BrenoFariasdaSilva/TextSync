// This file is the server-side code for the application. 
// It is responsible for creating the websocket connection and handling the events, like 'get-document' and 'send-changes'.
// It is also responsible for creating the connection object to the MongoDB database, as well as the Document model for the database operations.

// This loads the .env file from the root directory of the server.
require("dotenv").config({ path: "./.env" });

// Import the 'mongoose' package
const mongoose = require("mongoose");

// Import the 'Document' model
const Document = require("./Document");

// Define the default value for a new document data
const emptyDocument = "";

// Connect to the MongoDB database
// The 'DATABASE_URI' environment variable is defined in the .env file
// It returns a promise that resolves to the database connection object
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new server discovery and monitoring engine
}).then(() => console.log("MongoDB connected successfully")) // Log a success message if the connection is successful
.catch((err) => console.log(err)); // Log an error message if the connection is unsuccessful

// Import the 'http' package
const server = require("http").createServer();
server.listen(process.env.PORT, () => { // Listen on the specified port
   console.log(`Server listening on port ${process.env.PORT}`); // Log a success message if the server is listening
});

// Import the 'socket.io' package
const io = require("socket.io")(server, {
   // Configure Cross-Origin Resource Sharing (CORS)
   cors: {
      // Define the allowed origin for cross-origin requests
      origin: `${process.env.CLIENT_ADDRESS}`,
      // Define the allowed methods for cross-origin requests
      methods: ["GET", "POST"],
   },
});

// Store the active document sockets
const documentSockets = {};

// io.on is a listener for incoming connections
// It receives a socket object as a parameter
io.on("connection", socket => { // Add a listener for the 'connection' event
   // Add a listener for the 'get-document' event, which is emitted by the client
   // It receives a document ID as a parameter
   // Then, it emits the 'load-document' event to the client
   socket.on("get-document", async documentId => {
      const document = await findOrCreateDocumentById(documentId); // Find or create a document by its id
      socket.join(documentId); // Join the document room
      socket.emit("load-document", document.data); // Emit the 'load-document' event
      
      // Associate the document ID with the socket
      documentSockets[socket.id] = documentId;
   });

   // Add a listener for the 'send-changes' event
   // It receives a delta as a parameter, which is the changes made to the document by the client
   // Then, it emits the 'receive-changes' event to all clients in the same document room
   socket.on("send-changes", delta => { 
      // Get the document ID associated with the socket
      const documentId = documentSockets[socket.id];
      if (documentId) { // Check if the document ID is valid
      // Broadcast the changes only to clients in the same document room according to the document ID (UUID)
      socket.to(documentId).emit("receive-changes", delta);
      }
   });

   // Add a listener for the 'save-document' event
   // It receives a document ID and data as parameters
   // Then, it updates the document data in the database
   socket.on("save-document", async (documentId, data) => {
      await Document.findByIdAndUpdate(documentId, { data }); // Update the document data
   });

   // Add a listener for the 'disconnect' event
   // It removes the document ID association when the socket disconnects
   socket.on("disconnect", () => {
      // Remove the document ID association when the socket disconnects
      delete documentSockets[socket.id];
   });
});

// Find or create a document by its id
// It receives a document ID and data as parameters
// It returns a promise that resolves to return the document if it exists, or create a new document if it does not exist
async function findOrCreateDocumentById(id, data) {
   if (id == null) return; // Return if the id is null

   const document = await Document.findById(id); // Find the document by its id
   if (document) return document; // Return the document if it exists

   return await Document.create({ _id: id, data: emptyDocument }); // Create a new document if it does not exist
}