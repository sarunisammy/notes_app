import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateNotes from "./Pages/CreateNotes";
import EditNotes from "./Pages/EditNotes";
import Notes from "./Pages/Notes";
import useNotes from "./hooks/useNotes";

const App = () => {
  // console.log("notes: ", notes);
  return (
    <main id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/createNotes" element={<CreateNotes />} />
          <Route path="/edit-note/:id" element={<EditNotes />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
