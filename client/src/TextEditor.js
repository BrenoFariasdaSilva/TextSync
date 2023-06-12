// Import the necessary modules from the 'react' package
import React from "react";
import { useCallback, useEffect, useState } from "react";
import dotenv from  'dotenv';

// Import the 'Quill' library and its styles
import Quill from "quill";
import "quill/dist/quill.snow.css";

// Import the 'socket.io-client' package
import { io } from "socket.io-client";

// Load the environment variables from the '.env' file
dotenv.config();

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
      setQuill(q);
   }, []);

   // Render the container div and assign the wrapperRef callback as the 'ref' attribute
   return <div className="container" ref={wrapperRef}></div>;
}