import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Note from "./Note";
import "./App.css";
import styled from "styled-components";

const Heading = styled.h1`
  text-align: center;
`;

const TextBox = styled.div`
  text-align: center;
`;

const TextArea = styled.textarea`
  resize: none;
  width: 50vw;
  height: 10vh;
  font-family: sans-serif;
  font-size: 16px;
`;

const AddButton = styled.button`
  margin: 0.5rem auto;
  display: block;
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
`;

const Notes = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

interface NoteIface {
  id: string;
  complete: boolean;
  text: string;
}

function App() {
  const [notes, setNotes] = useState<any>([]);

  const noteNameRef = useRef<HTMLTextAreaElement>(null);

  const KEY = `notes`;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(KEY)!);
    if (stored) setNotes(stored);
  }, [KEY]);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(notes));
  }, [notes, KEY]);

  function toggleNote(id: string) {
    const newNotes: NoteIface[] = [...notes];

    const note: NoteIface = newNotes.find((note) => note.id === id)!;
    note.complete = !note.complete;
    setNotes(newNotes);
  }

  function deleteNote(id: string) {
    let newNotes = [...notes];
    newNotes = newNotes.filter((note: NoteIface) => note.id !== id);
    setNotes(newNotes);
  }

  function clearNotes() {
    const newNotes: NoteIface[] = notes.filter(
      (note: NoteIface) => !note.complete
    );
    setNotes(newNotes);
  }

  function handleNote(e: React.MouseEvent<HTMLButtonElement>) {
    let text = noteNameRef.current!.value;
    if (text === "") return;
    let id: string = uuidv4();
    setNotes((prevNotes: any) => [
      ...prevNotes,
      { id: id, text: text, complete: false },
    ]);
    noteNameRef.current!.value = "";
  }

  let notesList = notes.map((note: NoteIface) => {
    return (
      <Note
        key={note.id}
        note={note}
        toggleNote={toggleNote}
        deleteNote={deleteNote}
      />
    );
  });

  return (
    <>
      <Heading>Notes</Heading>
      <TextBox>
        <TextArea ref={noteNameRef} placeholder="write some text..."></TextArea>
      </TextBox>
      <AddButton onClick={handleNote}>Add note</AddButton>
      <AddButton onClick={clearNotes}>Remove complete</AddButton>
      <Notes>{notesList}</Notes>
    </>
  );
}

export default App;
