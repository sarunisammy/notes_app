import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const NoteItem = ({ note, deleteNote }) => {
  const navigate = useNavigate();
  // const { deleteNote } = useNotes();

  if (Object.keys(note).length < 1) {
    return null;
  }

  return (
    <div className="noteItem__container">
      <div className="header">
        <h4 className="title">
          {note.title.length > 50
            ? note.title.substr(0, 50) + "..."
            : note.title}
        </h4>
        <div className="header_btns">
          <button onClick={() => deleteNote(note.id)}>
            <RiDeleteBin6Line className="delete_btn" />
          </button>
          <button onClick={() => navigate(`/edit-note/${note.id}`)}>
            <AiOutlineEdit className="edit_btn" />
          </button>
        </div>
      </div>
      <div className="body__description">
        <p className="text">{note.details ?? "no details"}</p>
      </div>
      <p className="time">
        {" "}
        {new Intl.DateTimeFormat(undefined, {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(note?.date ?? new Date().toISOString()))}
      </p>
    </div>
  );
};

export default NoteItem;
