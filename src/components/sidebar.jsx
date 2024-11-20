import { useContext } from "react";
import { NotesContext } from "../Home";
import DOMPurify from "dompurify";
import { logOut } from "../firebase/authService";

export default function Sidebar() {
  const { notes, currentNote, setCurrentNoteId, createNewNote, deleteNote } =
    useContext(NotesContext);

  const sortedNotes = notes.sort((a, b) => {
    const aCreatedAt = new Date(a.createdAt).getTime();
    const bCreatedAt = new Date(b.createdAt).getTime();

    return aCreatedAt - bCreatedAt;
  });

  const noteElements = sortedNotes.map((note, index) => {
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
            className="delete--button"
            onClick={() => deleteNote(note.id)}
          >
            x
          </button>
        </div>
      </div>
    );
  });

  const handleLogOut = async () => {
    await logOut();
    // console.log("Successfully logged out");
    // window.location.href = 'http://localhost:5173/#/auth'
  };

  return (
    <section className="pane sidebar">
      <div>
        {noteElements}
        <button className="new-note" onClick={createNewNote}>
          +
        </button>
      </div>
      <div className="sidebar--header" onClick={handleLogOut}>
        <img
          className="Signout"
          src="/images/logout.png"
          alt="user"
          width="25px"
          height="25px"
        />
      </div>
    </section>
  );
}
