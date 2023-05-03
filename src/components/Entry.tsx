import React from 'react';

type EntryProps = {
  id: string;
  artist: string;
  album: string;
  coverArt: string;
  mood: string;
  date: string;
  deleteEntry: (arg: string) => void;
};
function Entry({
  id,
  artist,
  album,
  coverArt,
  mood,
  date,
  deleteEntry,
}: EntryProps) {
  return (
    <div className="entryItem" id={id}>
      <img src={coverArt} alt="album cover" />
      <div className="entryInfo">
        <h4>Artist</h4>
        <p>{artist}</p>
        <h4>Album</h4>
        <p>{album}</p>
        <h4>Mood</h4>
        <p>{mood}</p>
        <h4>Created</h4>
        <p>{date}</p>
        <button
          className="deleteBtn"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            const parent = (e.target as HTMLElement).parentElement
              ?.parentElement;
            if (parent) {
              parent.remove();
              deleteEntry(parent.id);
            }
          }}
        >
          Delete
        </button>
        <button className="pairBtn">Pair me?</button>
      </div>
    </div>
  );
}
export default Entry;
