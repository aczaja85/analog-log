import React from 'react';
import { useState } from 'react';
import { NewAlbum } from '../types';

type EntryCreatorProps = {
  addEntry: (arg: NewAlbum) => void;
};

function EntryCreator({ addEntry }: EntryCreatorProps) {
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [mood, setMood] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (name === 'artist') {
      setArtist(value);
    } else if (name === 'album') {
      setAlbum(value);
    }
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setMood(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      artist: artist,
      album: album,
      mood: mood,
    };
    addEntry(newEntry);
    setAlbum('');
    setArtist('');
    setMood('');
  };

  return (
    <form className="entryCreatorContainer" onSubmit={handleSubmit}>
      <h3>Listen to a record?</h3>
      <label htmlFor="artistInput">Artist:</label>
      <input
        id="artistInput"
        type="text"
        name="artist"
        value={artist}
        onChange={handleInputChange}
      />
      <label htmlFor="albumInput">Album:</label>
      <input
        id="albumInput"
        type="text"
        name="album"
        value={album}
        onChange={handleInputChange}
      />
      <label htmlFor="moodSelector">Mood:</label>
      <select name="mood" id="mood" value={mood} onChange={handleSelectChange}>
        <option value="none"></option>
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
      <button type="submit">Log it!</button>
    </form>
  );
}

export default EntryCreator;
