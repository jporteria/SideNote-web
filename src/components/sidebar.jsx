import React, { useContext } from "react";
import { context } from "../App";

export default function Sidebar() {
  const { notes, findCurrentNote, setCurrentNoteId, createNewNote } = useContext(context);
  // console.log(notes)
  // console.log(findCurrentNote)

  const noteElements = notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === findCurrentNote.id ? "selected-note" : ""
        }`}
        onClick={() => setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">Note {index + 1}</h4>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={createNewNote}>+</button>
      </div>
      {noteElements}
    </section>
  );
}
