export interface SavedEntry {
  artist: string;
  album: string;
  date: string;
  _id: string;
  mood: string;
  coverArt: string;
}

export interface NewAlbum {
  artist: string;
  album: string;
  mood: string;
  token: string;
}
