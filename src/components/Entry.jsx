import React, { Component } from 'react';
import { render } from 'react-dom';

//Entry component displays
class Entry extends Component {
  render() {
    return (
      <div className="entryItem" id={this.props.album}>
        <h4>Artist</h4>
        <p>{this.props.artist}</p>
        <h4>Album</h4>
        <p>{this.props.album}</p>
        <h4>Mood</h4>
        <p>{this.props.mood}</p>
        <h4>Created</h4>
        <p>{this.props.date}</p>
        <button
          className="deleteBtn"
          onClick={(e) => {
            e.target.parentElement.remove();
            this.props.deleteEntry(e.target.parentElement.id);
          }}
        >
          Delete
        </button>
        <button className="pairBtn">Pair me?</button>
      </div>
    );
  }
}

export default Entry;
