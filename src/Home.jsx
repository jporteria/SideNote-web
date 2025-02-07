import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Editor from "./components/editor.jsx";
import Sidebar from "./components/sidebar.jsx";
import Split from "react-split";
import {
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  setDoc,
  collection,
} from "firebase/firestore";

export const NotesContext = createContext({});

function Home() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "");
  const [tempNoteText, setTempNoteText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check the authentication state only once when component mounts
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser); // Set user state when the user is logged in
      } else {
        navigate("/auth"); // Redirect if the user is logged out
      }
    });

    return () => unsubscribeAuth(); // Clean up listener on unmount
  }, [navigate]);

  // Load notes when user is authenticated
  useEffect(() => {
    if (!user) return; // Exit if no user is authenticated

    const userNotesCollection = collection(db, "users", user.uid, "notes");

    const unsubscribe = onSnapshot(userNotesCollection, (snapshot) => {
      const notesArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArr); // Set notes when user is authenticated
    });

    return unsubscribe; // Clean up listener on unmount
  }, [user]); // Only run this effect when the user state changes

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

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
      const timeoutId = setTimeout(() => {
        updateNote(tempNoteText);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [tempNoteText]);

  async function createNewNote() {
    if (!user) return;

    const newNote = {
      body: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const userNotesCollection = collection(db, "users", user.uid, "notes");
    const newNoteRef = await addDoc(userNotesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
    setTempNoteText(newNote.body);
  }

  async function updateNote(text) {
    if (!user || !currentNoteId) return;

    const noteRef = doc(db, "users", user.uid, "notes", currentNoteId);
    await setDoc(
      noteRef,
      {
        body: text,
        updatedAt: Date.now(),
      },
      { merge: true }
    );
  }

  async function deleteNote(noteId) {
    if (!user) return;

    setIsDeleting(true);
    const noteRef = doc(db, "users", user.uid, "notes", noteId);
    await deleteDoc(noteRef);
    setIsDeleting(false);
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
            sizes={[900, 80]}
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

export default Home;
