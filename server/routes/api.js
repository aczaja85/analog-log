const express = require('express');

const albumsController = require('../controllers/albumsController');

const router = express.Router();

//get list of albums that have been saved to db
router.get('/', albumsController.getAlbums, (req, res) =>
  res.status(200).json(res.locals.albums)
);

//add a new album to db
router.post('/album', albumsController.addAlbum, (req, res) =>
  res.status(200).json(res.locals.newAlbum)
);

// Delete an album from the database
// http://localhost:3000/api/"album"
router.delete('/:album', albumsController.deleteAlbum, (req, res) => {
  return res.status(200).json(res.locals.deletedAlbum);
});

module.exports = router;
