import { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NotesContext } from "../App";

export default function Editor() {
    const { findCurrentNote, updateNote } = useContext(NotesContext);
    const [editorText, setEditorText] = useState(findCurrentNote.body);

    // Update the editor state when the current note changes
    useEffect(() => {
        setEditorText(findCurrentNote.body);
    }, [findCurrentNote]);

    // Update note when editor text changes
    const handleEditorChange = (text) => {
        setEditorText(text); // Update local editor state
        updateNote(text);     // Call update function
    };

    return (
        <section className="pane editor">
            <ReactQuill
                className="quill"
                theme="snow"
                value={editorText}
                onChange={handleEditorChange} // Use the new handler
                placeholder="Enter new notes"
            />
        </section>
    );
}
