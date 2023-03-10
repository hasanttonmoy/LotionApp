import { useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Edit() {
  const [sortedNotes, setNotes] = useOutletContext();
  const { id } = useParams();
  const note = sortedNotes.find((note) => note.id === id);
  const [body, setBody] = useState(note.body || '');
  const [when, setWhen] = useState(note.userDate);
  const [title, setTitle] = useState(note.title || '');

  const navigate = useNavigate();

  const onDeleteNote = (noteId) => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      var tb_del = sortedNotes.filter(({ id }) => id !== noteId);
      setNotes(tb_del);
    }
    if (tb_del.length > 0) {
      navigate(`/preview/${tb_del[0].id}`, { replace: true });
    } else {
      navigate(`/`, { replace: true });
    }
  };

  const onSaveNote = () => {
    const updatedNote = {
      ...note,
      title,
      body,
      bodyPreview: body,
      userDate: when,
      lastModified: Date.now(),
    };
    const noteIndex = sortedNotes.findIndex((n) => n.id === id);
    const newNotes = [...sortedNotes];
    newNotes[noteIndex] = updatedNote;
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    navigate(`/preview/${updatedNote.id}`, { replace: true });
  };

  if (!note) {
    return (
      <div className="no-active-note">Select a note or create a new one</div>
    );
  }

  return (
    <div id="mainbar">
      <div id="mainbar-header">
        <h1 id="mainbar-title">
          <input
            type="text"
            id="mainbar-title-input"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            autoFocus
          />
        </h1>
        <div id="mainbar-buttons">
          <button id="save_button" onClick={onSaveNote}>
            save
          </button>
          <button id="delete_button" onClick={(e) => onDeleteNote(note.id)}>
            delete
          </button>
        </div>
      </div>
      <div id="mainbar-edit">
        <div id="date">
          <input
            type="datetime-local"
            id="date"
            value={when}
            onChange={(e) => {
              setWhen(e.target.value);
            }}
          />
        </div>

        <div id="mainbar-content">
          <ReactQuill
            theme="snow"
            value={body}
            onChange={setBody}
            defaultValue={note.body}
          />
        </div>
      </div>
    </div>
  );
}

export default Edit;
