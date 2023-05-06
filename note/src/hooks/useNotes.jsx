import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatObject } from "../utils/parsers";

const NOTES_KEY = "NOTES";

function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fethNotes = useCallback(() => {
    setLoading(true);
    const notesFound = localStorage.getItem(NOTES_KEY);
    if (notesFound) {
      setLoading(false);
      setNotes(formatObject("parse", notesFound ?? []));
    } else {
      localStorage.setItem(NOTES_KEY, formatObject("string", []));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      console.log("refetching....");
      fethNotes();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  function addNote(note) {
    console.log("adding note...", note);
    if (!note || Object.keys(note).length < 1) return alert("Fill all fields!");
    const allNotes = [note, ...notes];
    console.log("all notes:", allNotes);
    localStorage.setItem(NOTES_KEY, formatObject("string", allNotes));
    setNotes(allNotes);
  }

  function editNote(noteUUID, newNoteDetails) {
    console.log("editing note...", noteUUID);
    const foundNote = notes.find((note) => note.id === noteUUID);
    if (foundNote) {
      if (Object.keys(newNoteDetails).length < 0)
        return alert(`note ${noteUUID} cannot be edited!`);
      const editNewNoteDetails = {
        ...newNoteDetails,
        date: foundNote?.date ?? new Date().toISOString(),
        id: noteUUID,
      };

      const newNotes = notes.filter((note) => note.id !== noteUUID);
      const allNotes = [...newNotes, editNewNoteDetails];
      setNotes(allNotes);
      localStorage.setItem(NOTES_KEY, formatObject("string", allNotes));
      // navigate("/");
    } else {
      alert("This note is note found and cannot be edited!!");
    }
  }

  // delete notes
  function deleteNote(noteUUID) {
    const allNotes = formatObject("parse", localStorage.getItem(NOTES_KEY));
    const foundNote = allNotes.find((note) => note.id === noteUUID);
    if (!foundNote) {
      return alert("Note note found! canot be deleted!");
    }
    const newNotes = allNotes.filter((note) => note.id !== noteUUID);
    console.log("filtered notes", newNotes);
    localStorage.setItem(NOTES_KEY, formatObject("string", newNotes));
    setNotes(newNotes);
  }

  // useEffect(() => {
  //   const notesFound = localStorage.getItem(NOTES_KEY);
  //   setNotes(formatObject("parse", notesFound ?? []));
  // }, [notes]);

  return { notes, loading, setNotes, addNote, editNote, deleteNote };
}

export default useNotes;
