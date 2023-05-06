import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineMinus } from "react-icons/ai";
import useCreateDate from "../components/useCreateDate";
import useNotes from "../hooks/useNotes";
import NotFound from "../components/NotFound";

const EditNotes = () => {
  const { notes, editNote, deleteNote } = useNotes();

  const { id } = useParams();
  const navigate = useNavigate();
  const editTitleRef = useRef("");
  const editDescriptionRef = useRef("");

  console.log("id found: ", id);
  const noteFound = notes.find((item) => item.id === id);

  // useEffect(() => {
  if (!noteFound) {
    return (
      <NotFound message={`Cannot edit this note! It was not found`} to="/" />
    );
  }
  // }, [noteFound]);

  const { title, details, date } = noteFound;

  console.log("editTitleRef", editTitleRef);
  console.log("noteFound", noteFound);

  // const date = useCreateDate()

  const handleForm = (e) => {
    e.preventDefault();
    const newTitle = editTitleRef.current.value;
    const newDescription = editDescriptionRef.current.value;

    const editPayload = {
      title: newTitle,
      details: newDescription,
    };
    const noteUUID = id;

    editNote(noteUUID, editPayload);

    //redirect to homepage
    navigate("/");
  };

  const handleDelete = (id) => {
    deleteNote(id);
    navigate("/");
  };

  return (
    <section>
      <div className="create-note__header">
        <div className="note__top-header">
          <Link className="note__link-header" to="/">
            <IoIosArrowBack />
          </Link>
          <button className="btn lg primary" onClick={handleForm}>
            Save
          </button>
          <button className="btn danger" onClick={() => handleDelete(id)}>
            <RiDeleteBin6Line />
          </button>
        </div>

        <form className="create-note__form" onSubmit={handleForm}>
          <input
            placeholder="Title"
            autoFocus
            type="text"
            defaultValue={title ?? ""}
            ref={editTitleRef}
          />
          <textarea
            rows="28"
            placeholder="Note details..."
            defaultValue={details ?? ""}
            ref={editDescriptionRef}
          ></textarea>
        </form>
        <Link to="/" className="btn add__btn">
          <AiOutlineMinus />
        </Link>
      </div>
    </section>
  );
};

export default EditNotes;

// const { id } = useParams();
//find the note

// const note = notes.find(item => item.id === id);
// const [title, setTitle] = useState(note.title);
// const [details, setDetails] = useState(note.details);

// const date = useCreateDate()
// const navigate = useNavigate()

// const handleForm = (e) => {
//   e.preventDefault();
//   if (title && details) {
//     //create new note
//     const newNote = {...note, title, details, date}

//     //map the newnote to the notes
//     const newNotes = notes.map(item =>{
//       if (item.id === id) {
//         item = newNote()

//       }
//       return item
//     })
//     setNotes(newNotes)

//   }
//   navigate('/')

// }

// const handleDelete = (e) =>{
//   const newNotes = notes.filter(item=> item.id !== id)
//   setNotes(newNotes)
//   navigate('/')
// }
