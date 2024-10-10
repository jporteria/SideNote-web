import { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NotesContext } from "../App";

export default function Editor() {
    const { currentNote, updateNote } = useContext(NotesContext);
    const [editorText, setEditorText] = useState(currentNote.body);

    // Update the editor state when the current note changes
    useEffect(() => {
        setEditorText(currentNote.body);
    }, [currentNote]);

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
