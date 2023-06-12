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
   return (
      <Router> // Wrap the 'TextEditor' component in a 'Router' component
         <Switch> 
            <Route path="/" exact> // Define the route for the home page
               <Redirect to={`/documents/`} />
            </Route>
            <Route path="/documents/:id"> // Define the route for the document page
               <TextEditor /> // Render the 'TextEditor' component
            </Route>
         </Switch>
      </Router>
   )
}

// Export the 'App' component as the default export
export default App;