// This file is the entry point of the application. It renders the 'App' component inside the root element of the HTML document.

// Import the necessary modules from the 'react' and 'react-dom' packages
import React from "react";
import ReactDOM from "react-dom/client";

// Import the main component of the application from the './App' file
import App from "./App";

// Import the CSS styles from the './styles.css' file
import "./styles.css";

// Create a root React element using 'ReactDOM.createRoot' and specify the DOM element to mount the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application inside the root element
root.render(
   <React.StrictMode>
      <App /> {/* Render the 'App' component */}
   </React.StrictMode>
);