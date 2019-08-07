import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import NoteContext from "../Context/NoteContext";
import "./NoteListMain.css";
import { getNotesForFolder, findFolder } from "../notes-helpers";

export default class NoteListMain extends React.Component {
  static contextType = NoteContext;

  renderList = () => {
    const { folderId } = this.props.match.params;
    const { notes, folders } = this.context;

    if (this.props.match.path === "/folder/:folderId") {
      const foundFolder = findFolder(folders, folderId);
      if (foundFolder === undefined) {
        return <h1>Folder Not Found</h1>;
      }
    }

    const filteredNotes = getNotesForFolder(notes, folderId);

    if (filteredNotes === undefined) {
      return <h1>No Notes Found</h1>;
    }

    return (
      <ul>
        {filteredNotes.map(note => (
          <li key={note.id}>
            <Note id={note.id} name={note.name} modified={note.modified} />
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <section className="NoteListMain">
        {this.renderList()}
        <div className="NoteListMain__button-container">
          <CircleButton
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain__add-note-button"
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    );
  }

  // NoteListMain.defaultProps = {
  //   notes: [],
  //}
}
