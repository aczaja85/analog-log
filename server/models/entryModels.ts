import mongoose, { Schema as SchemaM, model, Document } from 'mongoose';

interface AlbumDocument extends Document {
  artist: string;
  album: string;
  coverArt: string;
  mood: string;
  date: string;
}

const MONGO_URI =
  'mongodb+srv://aczaja:PS58Yyohat9gIFko@cluster0.ffnmyn3.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

//sets schema for the albums collection
const albumsSchema = new Schema<AlbumDocument>({
  artist: { type: String, required: true },
  album: { type: String, required: true },
  coverArt: { type: String, required: true },
  mood: { type: String, required: true },
  date: { type: String, required:true },
});

const Album = model<AlbumDocument>('album', albumsSchema);

export default { Album };
