// This file defines the 'App' component which is the root component of the application.
// This file is called by the 'index.js' file.
// The 'App' component renders the 'TextEditor' component which is the main component of the application.

// Import the necessary module from the 'react' package
import React from "react";

// Import the 'TextEditor' component from the './TextEditor' file
import TextEditor from "./TextEditor";

// Import the necessary modules from the 'react-router-dom' package
import {
   BrowserRouter as Router,
   Routes, // 'Routes' is a container for 'Route' components 
   Route, // 'Route' is a component that defines a route
   Navigate, // 'Navigate' is a component that redirects to a route
} from "react-router-dom";

// Import the 'uuid' package
import { v4 as uuidV4 } from "uuid";

// Define the 'App' component
function App() {
   // Render the 'TextEditor' component
   return (
      <Router> 
         <Routes>
            <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} />} /> {/* Redirect to a random generated document ID */}
            <Route path="/documents/:id" element={<TextEditor />} /> {/* Render the 'TextEditor' component */}
         </Routes>
      </Router>
   );
}

// Export the 'App' component as the default export
export default App;