import React from "react";
import styled from "styled-components";

const NoteBox = styled.div`
  font-size: 1.5em;
  font-family: sans-serif;
  text-align: center;
  color: palevioletred;
  margin: 0.5rem;
  background-color: #ffffcc;
  padding: 0.7rem;
`;

const Paragraph = styled.p`
  font-family: sans-serif;
  overflow: auto;
`;

const Button = styled.button`
  background-color: #f44336;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const Complete = styled.div`
  font-size: initial;
`;

interface NoteIface {
  id: string;
  complete: boolean;
  text: string;
}

interface NoteListIface {
  note: NoteIface;
  toggleNote: Function;
  deleteNote: Function;
}

export default function Note({ note, toggleNote, deleteNote }: NoteListIface) {
  function handleClick() {
    toggleNote(note.id);
  }

  function handleClickDelete() {
    deleteNote(note.id);
  }

  return (
    <NoteBox key={note.id}>
      <Button key={note.id} onClick={handleClickDelete}>
        delete
      </Button>
      <Complete>
        <label>Complete</label>
        <input
          key={note.id + "x"}
          type="checkbox"
          checked={note.complete}
          onChange={handleClick}
        />
      </Complete>
      <Paragraph>{note.text}</Paragraph>
    </NoteBox>
  );
}
