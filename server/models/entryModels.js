const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://aczaja:PS58Yyohat9gIFko@cluster0.ffnmyn3.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'analoglog',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

//sets schema for the albums collection
const albumsSchema = new Schema({
  artist: { type: String, required: true },
  album: { type: String, required: true },
  mood: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Album = mongoose.model('album', albumsSchema);

module.exports = { Album };
