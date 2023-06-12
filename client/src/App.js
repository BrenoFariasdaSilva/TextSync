// Import the necessary module from the 'react' package
import React from "react";

// Import the 'TextEditor' component from the './TextEditor' file
import TextEditor from "./TextEditor";

// Import the necessary modules from the 'react-router-dom' package
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
} from "react-router-dom";

// Define the 'App' component
function App() {
   // Render the 'TextEditor' component
   return <TextEditor />;
}

// Export the 'App' component as the default export
export default App;