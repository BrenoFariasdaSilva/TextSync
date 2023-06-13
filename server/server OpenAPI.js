// Desc: Server for the TextSync - A Realtime Distributed Text Editor.

// This loads the .env file from the root directory of the server.
require("dotenv").config({ path: "./.env" });

// Import the required packages
const express = require("express");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Import the 'Document' model
const Document = require("./Document");

// Connect to the MongoDB database
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected successfully"));

// Create an Express app
const app = express();

// Define the API routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));
app.use(express.json());

/**
 * @openapi
 * /api/document/{documentId}:
 *   get:
 *     summary: Get a document by ID
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get("/api/document/:documentId", async (req, res) => {
  const documentId = req.params.documentId;
  const document = await findOrCreateDocumentById(documentId);
  res.json(document);
});

/**
 * @openapi
 * /api/document/{documentId}:
 *   put:
 *     summary: Update a document
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Document'
 *     responses:
 *       200:
 *         description: Successful response
 */
app.put("/api/document/:documentId", async (req, res) => {
  const documentId = req.params.documentId;
  const data = req.body;
  await Document.findByIdAndUpdate(documentId, { data });
  res.sendStatus(200);
});

// Store the active document sockets
const documentSockets = {};

// io.on is a listener for incoming connections
io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocumentById(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);
    
    // Associate the document ID with the socket
    documentSockets[socket.id] = documentId;
  });

  socket.on("send-changes", delta => {
    // Get the document ID associated with the socket
    const documentId = documentSockets[socket.id];
    if (documentId) {
      // Broadcast the changes only to clients in the same document room
      socket.to(documentId).emit("receive-changes", delta);
    }
  });

  socket.on("save-document", async data => {
    await Document.findByIdAndUpdate(data._id, { data });
  });

  socket.on("disconnect", () => {
    // Remove the document ID association when the socket disconnects
    delete documentSockets[socket.id];
  });
});

// Define the default value for the document data
const defaultValue = "";

// Desc: Find or create a document by its id
async function findOrCreateDocumentById(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;

  return await Document.create({ _id: id, data: defaultValue });
}

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TextSync API",
      version: "1.0.0",
      description: "API endpoints for the TextSync application",
    },
    servers: [
      {
        url: `http://localhost:${process.env.SERVER_PORT}/api`,
      },
    ],
  },
  apis: ["./path/to/your/routes/file.js"], // Specify the file that contains the OpenAPI annotations
};

// Start the server
const server = app.listen(process.env.SERVER_PORT, () => {
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
  },
});

// ...

// Rest of your existing code
