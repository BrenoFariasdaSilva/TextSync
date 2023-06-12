// Desc: Server for the TextSync - A Realtime Distributed Text Editor.

// This loads the .env file from the root directory of the server.
require("dotenv").config({ path: "./.env" });

// Import the 'mongoose' package
const mongoose = require("mongoose");
// Import the 'Document' model
const Document = require("./Document");
// Connect to the MongoDB database
mongoose.connect(process.env.DATABASE_ADDRESS, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
   useCreateIndex: true
}).then(() => console.log("MongoDB connected successfully"))

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
   socket.on("get-document", async documentId => { // documentId is the id of the document
      const document = await findOrCreateDocumentById(documentId); // find or create the document by its id
      socket.join(documentId); // join the room identified by the documentId
      socket.emit("load-document", document.data); // emit a 'load-document' event to the client
   });

   socket.on("send-changes", delta => { // delta is the change in the text
      socket.broadcast.emit("receive-changes", delta); // broadcast the change to all other clients, except the sender
   })
});

// Define the default value for the document data
const defaultValue = "";

// Desc: Find or create a document by its id
async function findOrCreateDocumentById(id) {
   if (id == null) return; // if id is null, return

   // Find the document by its id
   const document = await Document.findById(id);

   // If the document exists, return it
   if (document) return document;

   // If the document does not exist, create it
   return await Document.create({ _id: id, data: defaultValue });
}