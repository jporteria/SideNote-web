import { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NotesContext } from "../Home";

export default function Editor() {
    const { tempNoteText, setTempNoteText } = useContext(NotesContext);
    const [editorText, setEditorText] = useState(tempNoteText);

    // Update the editor state when the current note changes
    useEffect(() => {
        setEditorText(tempNoteText);
    }, [tempNoteText]);

    // Update note when editor text changes
    const handleEditorChange = (text) => {
        setEditorText(text); // Update local editor state
        setTempNoteText(text); 
    };

    return (
        <section className="pane editor">
            <ReactQuill
                className="quill"
                theme="snow"
                value={editorText}
                onChange={handleEditorChange}
                placeholder="Enter new notes"
            />
        </section>
    );
}
