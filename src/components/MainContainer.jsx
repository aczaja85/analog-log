import React, { Component } from 'react';
import { render } from 'react-dom';
import EntryCreator from './EntryCreator';
import Entry from './Entry';

//container will hold state, render logcreator and log card
class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
    };
    this.addEntry = this.addEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
  }
  //get stored entries from DB, and populate entry container
  componentDidMount() {
    console.log('MainContainer compnent did mount');
    fetch('/api')
      .then((res) => res.json())
      .then((entries) => {
        this.setState({
          entries: entries,
        });
      });
  }
  //method will add a new entry to DB
  addEntry(newAlbum) {
    fetch('/api/album', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(newAlbum),
    })
      .then((res) => res.json())
      .then((albumAdded) => {
        const updatedEntries = this.state.entries;
        updatedEntries.push(albumAdded);
        this.setState({
          entries: updatedEntries,
        });
      });
  }
  //method will delete entry from DB and log it to console
  deleteEntry(albumName) {
    fetch(`/api/${albumName}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((deleteAlbum) => {
        console.log('Deleted Album:', deleteAlbum);
      });
  }

  render() {
    //iterate through entries stored in state, add to entry
    const entryItems = [];
    const records = this.state.entries;
    for (let i = 0; i < records.length; i++) {
      //push entry compenent to entryItems
      //adding properties, key, artist, album, mood, date
      //should the key be the id that's create with a new schema instance?
      entryItems.push(
        <Entry
          key={`${i}`}
          artist={records[i].artist}
          album={records[i].album}
          mood={records[i].mood}
          date={records[i].date}
          deleteEntry={this.deleteEntry}
        />
      );
    }
    return (
      <div className="mainContainer">
        <h1>The Analog Log</h1>
        <EntryCreator state={this.state} addEntry={this.addEntry} />
        <div className="entryContainer">{entryItems}</div>
      </div>
    );
  }
}

export default MainContainer;
