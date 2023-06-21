// This file creates the 'Document' model for the MongoDB database.

const { Schema, model } = require("mongoose");

// Define the schema for the Document model
const Document = new Schema({
	_id: String, // id of the document
	data: Object // data of the document
});

// Export the Document model
module.exports = model("Document", Document);