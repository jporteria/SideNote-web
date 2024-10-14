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
  // try {
  //   const savedNotes = localStorage.getItem("notes");
  //   return savedNotes ? JSON.parse(savedNotes) : [];
  // } catch (error) {
  //   console.error("Error parsing notes from localStorage:", error);
  //   return []; // Return an empty array if there's an error
  // }

  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "");
  // const [tempNoteText, setTempNoteText] = useState("")

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

  // const createNewNote = () => {
  //   const newNote = {
  //     id: nanoid(),
  //     body: "",
  //   };
  //   setNotes((prevNotes) => [...prevNotes, newNote]);
  //   setCurrentNoteId(newNote.id);
  // };

  async function createNewNote() {
    const newNote = {
      body: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }
  // function updateNote(text) {
  //   // Only update if the text is not the default value
  //   if (text !== "") {
  //     setNotes((oldNotes) =>
  //       oldNotes.map((oldNote) => {
  //         return oldNote.id === currentNoteId
  //           ? { ...oldNote, body: text }
  //           : oldNote;
  //       })
  //     );
  //   }
  // }
  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId);
    await setDoc(docRef, { body: text }, { merge: true });
  }

  // function deleteNote(event, noteId) {
  //   event.stopPropagation();
  //   setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  // }
  
  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
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
