import React, { Component } from 'react';
import { render } from 'react-dom';

//allows user to create an album entry
//entry will be logged in the database
class EntryCreator extends Component {
  render() {
    return (
      <div className="entryCreatorContainer">
        <h3>Listen to a record?</h3>
        <label htmlFor="artistInput">Artist:</label>
        <input id="artistInput" type="text" />
        <label htmlFor="albumInput">Album:</label>
        <input id="albumInput" type="text" />
        <label htmlFor="moodSelector">Mood:</label>
        <select name="mood" id="mood">
          <option value="none" selected disabled hidden></option>
          <option value="Focused">Focused</option>
          <option value="Heartache">Heartache</option>
          <option value="Hell-raiser">Hell-raiser</option>
          <option value="Nostalgic">Nostalgic</option>
          <option value="Good vibrations">Good vibrations</option>
          <option value="Freaky">Freaky</option>
          <option value="Far-out">Far-out</option>
          <option value="Too-far-out">Too far-out</option>
          <option value="Bored">Bored</option>
        </select>
        <button
          onClick={(e) => {
            //create a newEntry object
            const newEntry = {
              artist: document.querySelector('#artistInput').value,
              album: document.querySelector('#albumInput').value,
              mood: document.querySelector('#mood').value,
            };
            this.props.addEntry(newEntry);
            //reset form
            document.querySelector('#artistInput').value = '';
            document.querySelector('#albumInput').value = '';
            document.querySelector('#mood').value = '';
          }}
          type="button"
        >
          Log it!
        </button>
      </div>
    );
  }
}

export default EntryCreator;
