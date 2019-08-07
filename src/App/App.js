import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import dummyStore from "../dummy-store";
import { getNotesForFolder, findNote, findFolder } from "../notes-helpers";
import NoteContext from "../Context/NoteContext";
import "./App.css";

class App extends Component {
  state = {
      notes: [],
      folders: [],
      loading: true
  };

  componentDidMount() {
      // fake date loading from API call
      // setTimeout(() => this.setState({...dummyStore, loading: false}), 600);
      fetch('http://localhost:9090/folders')
      .then(resp => resp.json())
      .then(data => this.setState({folders: data}))

      fetch('http://localhost:9090/notes')
      .then(resp => resp.json())
      .then(data => this.setState({notes: data, loading: false}))

  }

  renderNavRoutes() {
    // const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NoteListNav {...routeProps} />
            )}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            // const { noteId } = routeProps.match.params;
            // const note = findNote(notes, noteId) || {};
            // const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps}/>// folder={folder} />;
          }}
        />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    // const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => <NoteListMain {...routeProps} />}
          />
        ))}
        <Route
          path="/note/:noteId"
        render={routeProps => <NotePageMain {...routeProps}/>}
        />
      </>
    );
  }

  render() {

    if(this.state.loading){
        return <h1>Loading</h1>
    }
    return (
      <div className="App">
        <NoteContext.Provider value={this.state}>
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
        </NoteContext.Provider>
        <header className="App__header">
          <h1>
            <Link to="/">Noteful</Link> <FontAwesomeIcon icon="check-double" />
          </h1>
        </header>
        <NoteContext.Provider value={this.state}>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </NoteContext.Provider>
      </div>
    );
  }
}

export default App;
