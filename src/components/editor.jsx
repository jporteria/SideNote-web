import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { context } from "../App";

export default function Editor() {
  // const [value, setValue] = useState("");
  const { findCurrentNote, updateNote, notes } = useContext(context);

  console.log(notes);

  return (
    <section className="pane editor">
      <ReactQuill
        className="quill"
        theme="snow"
        value={findCurrentNote.body}
        onChange={updateNote}
      />
    </section>
  );
}
