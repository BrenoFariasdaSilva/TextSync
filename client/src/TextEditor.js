// This file defines the 'TextEditor' component which is the main component of the application.
// This file is called by the 'App.js' file.
// The 'TextEditor' component renders the Quill editor and handles the socket events, like 'save-document' and 'load-document'.

// Import the necessary modules from the 'react' package
import React from "react";
import { useCallback, useEffect, useState } from "react";

// Import the necessary modules from the 'react-router-dom' package
import { useParams } from "react-router-dom";

// Import the 'dotenv' package
import dotenv from  'dotenv';

// Import the 'Quill' library and its styles
import Quill from "quill";
import "quill/dist/quill.snow.css";

// Import the 'socket.io-client' package
import { io } from "socket.io-client";

// Load the environment variables from the '.env' file
dotenv.config();

// Define the save interval in milliseconds
const SAVE_INTERVAL_MS = 1000; // Define the save interval in milliseconds

// Define the toolbar options for the Quill editor
const TOOLBAR_OPTIONS = [
   [{ header: [1, 2, 3, 4, 5, 6, false] }], // header dropdown
   [{ font: [] }], // font dropdown
   [{ list: "ordered" }, { list: "bullet" }], // list dropdown
   ["bold", "italic", "underline"], // toggled buttons
   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
   [{ script: "sub" }, { script: "super" }], // superscript/subscript
   [{ align: [] }], // text align
   ["image", "blockquote", "code-block"], // blocks
   ["clean"], // remove formatting
]; // Define the toolbar options for the Quill editor

// Define the 'TextEditor' component
// @brief: This component renders the Quill editor and handles the socket events, like 'save-document' and 'load-document'.
export default function TextEditor() {
   const { id: documentId } = useParams(); // Get the document ID from the URL
   const [socket, setSocket] = useState(); // Create a state variable to store the socket
   const [quill, setQuill] = useState(); // Create a state variable to store the Quill editor

   // Create a side effect using 'useEffect' to connect to the server
   useEffect(() => {
      // Create a new socket.io-client instance and connect to the server
      const s = io(`${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}`);
      setSocket(s); // Set the socket state variable to the socket
      return () => {
         s.disconnect(); // Disconnect the socket when the component unmounts
      }
   }, []); // Pass an empty dependency array to run this side effect only once

   // Create a side effect using 'useEffect' to fill the Quill editor with the document content
   useEffect(() => {
      if (socket == null || quill == null) return; // Return if the socket or Quill editor is not ready
      socket.once("load-document", document => { // Add a one-time listener for the 'load-document' event
         quill.setContents(document); // Fill the Quill editor with the document content
         quill.enable(); // Enable the Quill editor
      }); // Add a one-time listener for the 'load-document' event

      socket.emit("get-document", documentId); // Send a 'get-document' event to the server passing the document id
   }, [socket, quill, document, documentId]); // Pass the dependencies of this side effect

   // Create a side effect using 'useEffect' to save the document
   useEffect(() => { 
      if (socket == null || quill == null) return; // Return if the socket or Quill editor is not ready

      const interval = setInterval(() => { // Create an interval to save the document
         socket.emit("save-document", documentId , quill.getContents()); // Send a 'save-document' event to the server passing the document content
      }, SAVE_INTERVAL_MS); // Create an interval to save the document

      return () => { // Return a cleanup function to clear the interval
         clearInterval(interval); // Clear the interval
      }
   }, [socket, quill]); // Pass the dependencies of this side effect

   // Create a side effect using 'useEffect' to update the editor
   useEffect(() => {
      if (socket == null || quill == null) return;

      // Add a listener to the 'send-changes' event of the Quill editor
      const handler = (delta, oldDelta, source) => {
         if (source !== "user") return; // Return if the source is not from the user
         socket.emit("send-changes", delta); // Send a 'send-changes' event to the server passing the delta
      } 

      // Add the listener to emit the 'text-change' event
      quill.on("text-change", handler);

      // Return a cleanup function to remove the listener
      return () => {
         quill.off("text-change");  // Remove the listener
      }
   }, [socket, quill]); // Pass the dependencies of this side effect

   // Create a side effect using 'useEffect' to receive changes from the server
   useEffect(() => {
      if (socket == null || quill == null) return; // Return if the socket or Quill editor is not ready

      // Add a listener to the 'text-change' event of the Quill editor
      const handler = (delta) => {
         quill.updateContents(delta); // Update the Quill editor with the delta
      }

      // Add the listener to emit the 'text-change' event
      socket.on("receive-changes", handler);

      // Return a cleanup function to remove the listener
      return () => {
         socket.off("receive-changes"); // Remove the listener
      }
   }, [socket, quill]); // Pass the dependencies of this side effect

   // Create a callback using 'useCallback' to store a reference to the container div
   const wrapperRef = useCallback((wrapper) => {
      // If the div with id="container" does not exist, then return
      if (wrapper == null) return;

      // Clear the content of the container div
      wrapper.innerHTML = "";

      // Create a new div element for the Quill editor
      const editor = document.createElement("div");

      // Append the Quill editor div to the container div
      wrapper.append(editor);

      // Create a new Quill object with specified options
      const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } });
      q.disable(); // Disable the Quill editor
      q.setText("Loading..."); // Set the text of the Quill editor to "Loading..."
      setQuill(q); // Set the Quill state variable to the Quill object
   }, []);

   // Render the container div and assign the wrapperRef callback as the 'ref' attribute
   return <div className="container" ref={wrapperRef}></div>;
} 