import { useState, createContext } from "react";
import "./App.css";
import Editor from "./components/editor.jsx";
import Sidebar from "./components/sidebar.jsx";
import Split from "react-split";
import { nanoid } from "nanoid";

// eslint-disable-next-line react-refresh/only-export-components
export const context = createContext({});

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your note's here",
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote;
      })
    );
  }

  function findCurrentNoteFunction() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }
  const findCurrentNote = findCurrentNoteFunction();

  return (
    <context.Provider
      value={{
        notes,
        findCurrentNote,
        setCurrentNoteId,
        updateNote,
        createNewNote,
      }}
    >
      <main>
        {notes.length > 0 ? (
          <Split sizes={[80, 20]} direction="horizontal" className="split">
            {currentNoteId && notes.length > 0 && <Editor />}
            <Sidebar />
          </Split>
        ) : (
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button className="first-note" onClick={createNewNote}>
              Create one now
            </button>
          </div>
        )}
      </main>
    </context.Provider>
  );
}

export default App;
