import React from "react";
import Note from "../Note/Note";
import "./NotePageMain.css";
import NoteContext from "../Context/NoteContext";

import { findNote } from "../notes-helpers";

export default class NotePageMain extends React.Component {
  static contextType = NoteContext;

  render() {
    const noteId = this.props.match.params.noteId;
    const { notes } = this.context;
    const note = findNote(notes, noteId)

    if(note === undefined){
      return <h1>No Note Found</h1>
    }

    return (
      <section className="NotePageMain">
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
        />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
}

// NotePageMain.defaultProps = {
//   note: {
//     content: ""
//   }
// };
