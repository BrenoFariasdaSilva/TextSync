// Desc: Server for the TextSync - A Realtime Distributed Text Editor.

// This loads the .env file from the root directory of the server.
require("dotenv").config({ path: "./.env" });

// Import the 'mongoose' package
const mongoose = require("mongoose");

// Import the 'Document' model
const Document = require("./Document");

// Define the allowed address for incoming connections
const allowedAddress = "0.0.0.0";
// Define the maximum number of connections
const maxConnections = 100;

// Connect to the MongoDB database
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new server discovery and monitoring engine
}).then(() => console.log("MongoDB connected successfully")) // Log a success message if the connection is successful
.catch((err) => console.log(err)); // Log an error message if the connection is unsuccessful

// Import the 'http' package
const server = require("http").createServer();
server.listen(process.env.SERVER_PORT, allowedAddress, maxConnections, () => { // Listen on the specified port
   console.log(`Server listening on port ${process.env.SERVER_PORT}`); // Log a success message if the server is listening
});

// Import the 'socket.io' package
const io = require("socket.io")(server, {
   // Configure Cross-Origin Resource Sharing (CORS)
   cors: {
      // Define the allowed origin for cross-origin requests from any client
      origin: "*",
      // Define the allowed HTTP methods for cross-origin requests
      methods: ["GET", "POST"],
   },
});

// Store the active document sockets
const documentSockets = {};

// io.on is a listener for incoming connections
io.on("connection", socket => { // Add a listener for the 'connection' event
   // Add a listener for the 'get-document' event
   socket.on("get-document", async documentId => {
      const document = await findOrCreateDocumentById(documentId); // Find or create a document by its id
      socket.join(documentId); // Join the document room
      socket.emit("load-document", document.data); // Emit the 'load-document' event
      
      // Associate the document ID with the socket
      documentSockets[socket.id] = documentId;
   });

   // Add a listener for the 'send-changes' event
   socket.on("send-changes", delta => { 
      // Get the document ID associated with the socket
      const documentId = documentSockets[socket.id];
      if (documentId) { // Check if the document ID is valid
      // Broadcast the changes only to clients in the same document room
      socket.to(documentId).emit("receive-changes", delta);
      }
   });

   // Add a listener for the 'save-document' event
   socket.on("save-document", async (documentId, data) => {
      await Document.findByIdAndUpdate(documentId, { data }); // Update the document data
   });

   // Add a listener for the 'disconnect' event
   socket.on("disconnect", () => {
      // Remove the document ID association when the socket disconnects
      delete documentSockets[socket.id];
   });
});

// Define the default value for the document data
const defaultValue = "";

// Find or create a document by its id
async function findOrCreateDocumentById(id, data) {
   if (id == null) return; // Return if the id is null

   const document = await Document.findById(id); // Find the document by its id
   if (document) return document; // Return the document if it exists

   return await Document.create({ _id: id, data: defaultValue }); // Create a new document if it does not exist
}