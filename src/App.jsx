import { useState, createContext, useEffect } from "react";
import "./App.css";
import Editor from "./components/editor.jsx";
import Sidebar from "./components/sidebar.jsx";
import Split from "react-split";
import { nanoid } from "nanoid";

export const NotesContext = createContext({});

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem("notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch (error) {
      console.error("Error parsing notes from localStorage:", error);
      return []; // Return an empty array if there's an error
    }
  });

  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0]?.id) || ""
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "",
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setCurrentNoteId(newNote.id);
  };
  // const createNewNote = createNewNoteFunction();

  function updateNote(text) {
    // Only update if the text is not the default value
    if (text !== "") {
      setNotes((oldNotes) =>
        oldNotes.map((oldNote) => {
          return oldNote.id === currentNoteId
            ? { ...oldNote, body: text }
            : oldNote;
        })
      );
    }
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  // function findCurrentNoteFunction() {
  //   return (
  //     notes.find((note) => {
  //       return note.id === currentNoteId;
  //     }) || notes[0]
  //   );
  // }

  return (
    <NotesContext.Provider
      value={{
        notes,
        currentNote,
        setCurrentNoteId,
        updateNote,
        createNewNote,
        deleteNote,
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
    </NotesContext.Provider>
  );
}

export default App;
