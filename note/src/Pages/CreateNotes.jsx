import { useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import useNotes from "../hooks/useNotes";

const CreateNotes = () => {
  const { addNote } = useNotes();

  const titleRef = useRef("");
  const detailsRef = useRef("");
  // const date = useCreateDate()
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const details = detailsRef.current.value;

    if (title !== "" && details !== "") {
      const note = {
        id: uuid(),
        title,
        details,
        date: new Date().toISOString(),
      };

      addNote(note);
      //navigate the newnotes to the home
      navigate("/");
    }
  };
  return (
    <section>
      <div className="create-note__header">
        <div className="note__top-header">
          <Link className="note__link-header" to="/">
            <IoIosArrowBack />
          </Link>
          <button className="btn lg primary" onClick={handleSubmit}>
            Done
          </button>
        </div>

        {/* <button className='btn danger'><RiDeleteBin6Line/></button> */}
        <form className="create-note__form" onSubmit={handleSubmit}>
          <input placeholder="Title" autoFocus type="text" ref={titleRef} />
          <textarea
            rows="28"
            placeholder="Note details..."
            ref={detailsRef}
          ></textarea>
        </form>
      </div>
    </section>
  );
};

export default CreateNotes;
