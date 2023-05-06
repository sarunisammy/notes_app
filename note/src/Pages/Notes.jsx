import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

import { AiOutlinePlus } from "react-icons/ai";
import NoteItem from "../components/NoteItem";
import useNotes from "../hooks/useNotes";

const Notes = () =>
  // { notes, deleteNote }
  {
    const { notes, loading, deleteNote } = useNotes();

    // working on search button
    const [showSearch, setShowSearch] = useState(false);
    //get what we are searching - text
    const [text, setText] = useState("");
    //initiating the text search
    const [filteredNotes, setFilteredNotes] = useState(notes);

    // console.log("notes in the system: ", notes);

    return (
      <section>
        <header className=" notes__header">
          {!showSearch && <h1>My Notes</h1>}
          {showSearch && (
            <input
              placeholder="search here"
              // bautoFocus
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></input>
          )}
          <button
            className="btn "
            // onClick={() => setShowSearch((prevState) => !prevState)}
          >
            <BsSearch />
          </button>
        </header>
        {loading ? (
          <p>loading</p>
        ) : (
          <div className="notes__container">
            {notes?.length > 0 ? (
              notes?.map((note) => (
                <NoteItem key={note.id} note={note} deleteNote={deleteNote} />
              ))
            ) : (
              <div style={{ color: "red" }}> No notes in the database </div>
            )}
          </div>
        )}

        <Link to="CreateNotes" className="btn add__btn">
          <AiOutlinePlus />
        </Link>
      </section>
    );
  };

export default Notes;
