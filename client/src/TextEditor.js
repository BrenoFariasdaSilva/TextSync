import React from 'react'
import { useEffect } from 'react';
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function TextEditor() {
   useEffect(() => { // useEffect is a hook that runs when the component is mounted. This makes it so that the editor is only rendered once the component is mounted.
      new Quill("#container", { theme: "snow" }) // This creates a new Quill object and renders it in the div with id="container".
   }, [])
   return <div id="container"></div>
}
