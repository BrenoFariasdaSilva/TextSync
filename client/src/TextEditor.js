// Import the necessary modules from the 'react' package
import React from "react";
import { useCallback, useEffect } from "react";

// Import the 'Quill' library and its styles
import Quill from "quill";
import "quill/dist/quill.snow.css";

// Import the 'socket.io-client' package
import { io } from "socket.io-client";

// This loads the .env file from the root directory of the client.
require('dotenv').config({ path: './.env' });

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
   // Create a side effect using 'useEffect' to connect to the server
   useEffect(() => {
      // Create a new socket.io-client instance and connect to the server
      const socket = io(`${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`);
      return () => {
         // Disconnect from the server when the component unmounts
         socket.disconnect();
      }
   }, []);

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
      new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } });
   }, []);

   // Render the container div and assign the wrapperRef callback as the 'ref' attribute
   return <div className="container" ref={wrapperRef}></div>;
}