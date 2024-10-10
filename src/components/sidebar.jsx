import React, { useContext } from "react";
import { NotesContext } from "../App";
import DOMPurify from "dompurify";

export default function Sidebar() {
  const {
    notes,
    currentNote,
    setCurrentNoteId,
    createNewNote,
    deleteNote,
  } = useContext(NotesContext);

  const noteElements = notes.map((note, index) => {
    const bodyContent = note.body || "";
    const plainTextWithNewLines = bodyContent.replace(/<\/?p>/gi, "\n");
    const plainText = DOMPurify.sanitize(plainTextWithNewLines, {
      ALLOWED_TAGS: [],
    });
    const firstLine = (plainText.split("\n")[1] || "").trim() || "Untitled";

    return (
      <div key={note.id}>
        <div
          className={`title ${
            note.id === currentNote.id ? "selected-note" : ""
          }`}
          onClick={() => setCurrentNoteId(note.id)}
        >
          <h4 className="text-snippet">{firstLine}</h4>
          <button
            className="delete-button"
            onClick={(event) => deleteNote(event, note.id)}
          >
            x
          </button>
        </div>
      </div>
    );
  });

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
      </div>
      {noteElements}
      <button className="new-note" onClick={createNewNote}>
        Add new note
      </button>
    </section>
  );
}
