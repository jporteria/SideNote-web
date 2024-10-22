import { useState, createContext, useEffect } from "react";
import "./App.css";
import Editor from "./components/editor.jsx";
import Sidebar from "./components/sidebar.jsx";
import Split from "react-split";
// import { nanoid } from "nanoid";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import { notesCollection, db } from "./firebase";

export const NotesContext = createContext({});

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "");
  const [tempNoteText, setTempNoteText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      const notesArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);

  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote]);

  useEffect(() => {
    if (tempNoteText !== "" && !isDeleting) {
      // Check for value and not deleting
      const timeoutId = setTimeout(() => {
        updateNote(tempNoteText);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [tempNoteText]);

  async function createNewNote() {
    const newNote = {
      body: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);

    setTempNoteText(newNote.body);
  }

  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId);
    await setDoc(
      docRef,
      {
        body: text,
        updatedAt: Date.now(),
      },
      { merge: true }
    );
    console.log("update function was run", text, currentNote?.body);
  }

  // function deleteNote(event, noteId) {
  //   event.stopPropagation();
  //   setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  // }

  async function deleteNote(noteId) {
    setIsDeleting(true); // Set isDeleting to true before deleting
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
    setIsDeleting(false); // Set isDeleting back to false after deletion
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        currentNote,
        setCurrentNoteId,
        updateNote,
        createNewNote,
        deleteNote,
        tempNoteText,
        setTempNoteText,
      }}
    >
      <main>
        {notes.length > 0 ? (
          <Split
            sizes={[90, 10]}
            direction="horizontal"
            className="split"
            gutterSize={3}
            minSize={50}
          >
            <Editor />
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
