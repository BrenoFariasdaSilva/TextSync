import React from "react";
import { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

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
]

export default function TextEditor() {
   const wrapperRef = useCallback((wrapper) => { // This creates a reference to the div with id="container".
      if (wrapper == null) return; // If the div with id="container" does not exist, then return.

      wrapper.innerHTML = ""; // This clears the div with id="container".
      const editor = document.createElement("div"); // This creates a div element.
      wrapper.append(editor); // This appends the div element to the div with id="container".
      new Quill(editor, { theme: "snow", modules: {toolbar: TOOLBAR_OPTIONS} }); // This creates a Quill object.
   }, []);
   return <div className="container" ref={wrapperRef}></div>
}