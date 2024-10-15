import { useState, createContext, useEffect } from "react";
import "./App.css";
import Editor from "./components/editor.jsx";
import Sidebar from "./components/sidebar.jsx";
import Split from "react-split";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import { notesCollection, db } from "./firebase";

export const NotesContext = createContext({});

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [tempNoteText, setTempNoteText] = useState("");
  const [isCreating, setIsCreating] = useState(false); // New flag to avoid premature updates

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  // Fetch notes from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      const notesArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);

  // Set currentNoteId to the first note if none is selected
  useEffect(() => {
    if (!currentNoteId && notes.length > 0) {
      setCurrentNoteId(notes[0].id);
    }
  }, [notes]);

  // Sync tempNoteText with the current note's body
  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote]);

  // Update the note after a delay when tempNoteText changes
  useEffect(() => {
    if (!isCreating && currentNoteId) {
      // Prevent update during note creation
      const timeoutId = setTimeout(() => {
        if (tempNoteText !== currentNote?.body) {
          updateNote(tempNoteText);
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [tempNoteText, currentNoteId]); // Make sure currentNoteId is a dependency

  // Create a new note in Firestore
  async function createNewNote() {
    setIsCreating(true); // Set flag to prevent premature updates
    const newNote = {
      body: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
    setIsCreating(false); // Reset flag after note is created
  }

  // Update note in Firestore
  async function updateNote(text) {
    if (!currentNoteId) return; // Prevent updates if there's no valid currentNoteId
    const docRef = doc(db, "notes", currentNoteId);
    await setDoc(
      docRef,
      {
        body: text,
        updatedAt: Date.now(), // Always update updatedAt timestamp
      },
      { merge: true }
    );
  }

  // Delete a note in Firestore
  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
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
          <Split sizes={[80, 20]} direction="horizontal" className="split">
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
