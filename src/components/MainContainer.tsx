import React, { useEffect, useState } from 'react';
import EntryCreator from './EntryCreator';
import Entry from './Entry';
import { SavedEntry, NewAlbum } from '../types';

//container will hold state, render logcreator and log card
function MainContainer() {
  const [entries , setEntries] = useState<SavedEntry[]>([]);

  //get stored entries from DB, and populate entries
  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((savedEntries) => {
        setEntries(savedEntries);
      });
  }, []);

  // will add a new entry to DB
  function addEntry(newAlbum: NewAlbum ) {
    fetch('/api/album', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(newAlbum),
    })
      .then((res) => res.json())
      .then((albumAdded) => {
        setEntries([...entries, albumAdded]);
      });
  }

  //will delete entry from DB and log it to console
  function deleteEntry(albumId: string) {
    fetch(`/api/${albumId}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((deleteAlbum) => {
        console.log('Deleted Album:', deleteAlbum);
      });
  }

  return (
    <div className="mainContainer">
      <h1>The Analog Log</h1>
      <EntryCreator addEntry={addEntry} />
      <div className="entryContainer">
        {entries.map((record) => (
          <Entry
            key={record._id}
            id={record._id}
            artist={record.artist}
            album={record.album}
            mood={record.mood}
            date={record.date}
            deleteEntry={deleteEntry}
          />
        ))}
      </div>
    </div>
  );
}
export default MainContainer;
