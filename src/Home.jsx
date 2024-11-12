import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";  // Import the auth state change listener
import Editor from "./components/editor.jsx";
import Sidebar from "./components/sidebar.jsx";
import Split from "react-split";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc, collection } from "firebase/firestore";

export const NotesContext = createContext({});

function Home() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "");
  const [tempNoteText, setTempNoteText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [user, setUser] = useState(null);  // Track the user state
  const navigate = useNavigate();

  // Check if token exists when Home component mounts
  useEffect(() => {
    chrome.storage.local.get(["authToken"], (result) => {
      if (!result.authToken) {
        navigate("/"); // Redirect to landing page if no token is found
      }
    });
  }, [navigate]);

  // Set up an auth listener to wait until user is authenticated
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);  // Set the user state after authentication state changes
    });
    return () => unsubscribeAuth();
  }, []);

  // Load notes only when the user is authenticated
  useEffect(() => {
    if (!user) return;

    const userNotesCollection = collection(db, "users", user.uid, "notes");

    // Subscribe to the user's notes collection
    const unsubscribe = onSnapshot(userNotesCollection, (snapshot) => {
      const notesArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArr);
    });

    return unsubscribe;
  }, [user]);

  const currentNote = notes.find((note) => note.id === currentNoteId) || notes[0];

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
    console.log("update function was run", text, currentNote?.body);
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

export default Home;
