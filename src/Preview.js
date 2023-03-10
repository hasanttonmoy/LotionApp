import React from "react";
import { useOutletContext, useParams, Link, useNavigate } from "react-router-dom";

function Preview() {
  const { id } = useParams();
  const [notes, setNotes] = useOutletContext();
  const navigate = useNavigate();
  
  // Find the note with the given ID
  const note = notes.find((note) => note.id === id);
  
  // If the note cannot be found, redirect to home page
  if (!note) {
    navigate(`/`, { replace: true });
    return null;
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };

  const onDeleteNote = (noteId) => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      setNotes(notes.filter(({ id }) => id !== noteId));
    }
    // Redirect to home page after deleting the note
    navigate(`/`, { replace: true });
  };

  return (
    <div id="mainbar">
      <div className="app-main">
        <div className="app-main-note-edit">
          <div id="mainbar-header">
            <h1 id="mainbar-title">
              {note.title && note.title.substr(0, 100)} {"..."}
            </h1>
            <div id="mainbar-buttons">
              <Link key={note.id} to={"/Edit/" + note.id} id="edit-link">
                <button id="save_button">Edit</button>
              </Link>
              <button id="delete_button" onClick={(e) => onDeleteNote(note.id)}>
                delete
              </button>
            </div>
          </div>
          <div id="mainbar-edit">
            <div id="date">{formatDate(note.userDate)}</div>

            <div
              id="mainbar-content"
              dangerouslySetInnerHTML={{ __html: note.body }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
