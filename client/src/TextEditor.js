// Import the necessary modules from the 'react' package
import React from "react";
import { useCallback, useEffect, useState } from "react";
import dotenv from  'dotenv';
import { useParams } from "react-router-dom";

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
   [{ header: [1, 2, 3, 4, 5, 6, false] }],
   [{ font: [] }],
   [{ list: "ordered" }, { list: "bullet" }],
   ["bold", "italic", "underline"],
   [{ color: [] }, { background: [] }],
   [{ script: "sub" }, { script: "super" }],
   [{ align: [] }],
   ["image", "blockquote", "code-block"],
   ["clean"],
];

// Define the 'TextEditor' component
export default function TextEditor() {
   const { id: documentId } = useParams();
   const [socket, setSocket] = useState();
   const [quill, setQuill] = useState();
   // Create a side effect using 'useEffect' to connect to the server
   useEffect(() => {
      // Create a new socket.io-client instance and connect to the server
      const s = io(`${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}`);
      setSocket(s);
      return () => {
         // Disconnect from the server when the component unmounts
         s.disconnect();
      }
   }, []);

   useEffect(() => {
      if (socket == null || quill == null) return;
      socket.once("load-document", document => {
         quill.setContents(document);
         quill.enable();
      });

      socket.emit("get-document", documentId); // Send a 'get-document' event to the server passing the document id
   }, [socket, quill, document, documentId]);

   useEffect(() => {
      if (socket == null || quill == null) return;

      const interval = setInterval(() => {
         socket.emit("save-document", quill.getContents());
      }, SAVE_INTERVAL_MS);

      return () => {
         clearInterval(interval);
      }
   }, [socket, quill]);

   // Create a side effect using 'useEffect' to update the editor
   useEffect(() => {
      if (socket == null || quill == null) return;

      // Add a listener to the 'text-change' event of the Quill editor
      const handler = (delta, oldDelta, source) => {
         if (source !== "user") return;
         socket.emit("send-changes", delta);
      }

      // Add the listener to emit the 'text-change' event
      quill.on("text-change", handler);

      // Return a cleanup function to remove the listener
      return () => {
         quill.off("text-change");
      }
   }, [socket, quill]);

   useEffect(() => {
      if (socket == null || quill == null) return;

      // Add a listener to the 'text-change' event of the Quill editor
      const handler = (delta) => {
         quill.updateContents(delta);
      }

      // Add the listener to emit the 'text-change' event
      socket.on("receive-changes", handler);

      // Return a cleanup function to remove the listener
      return () => {
         socket.off("receive-changes");
      }
   }, [socket, quill]);

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
      q.disable();
      q.setText("Loading...");
      setQuill(q);
   }, []);

   // Render the container div and assign the wrapperRef callback as the 'ref' attribute
   return <div className="container" ref={wrapperRef}></div>;
}