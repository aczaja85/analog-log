const models = require('../models/entryModels');

const albumsController = {};

//get all albums in album collection
albumsController.getAlbums = (req, res, next) => {
  //find all albums in album collection
  models.Album.find((err, albums) => {
    if (err)
      return next({
        log: 'albumController.getAlbums',
        message: 'check log for detials',
      });
    // save to res.locals
    res.locals.albums = albums;
    return next();
  });
};

//add album to collection
albumsController.addAlbum = (req, res, next) => {
  //create a new instace of Album model from data on req body
  const newAlbum = req.body;
  models.Album.create(newAlbum, (err, album) => {
    if (err)
      return next({
        log: 'albumController.addAlbum',
        message: 'check log for detials',
      });
    //save to res.locals
    res.locals.newAlbum = album;
    return next();
  });
};

albumsController.deleteAlbum = (req, res, next) => {
  console.log('req.params in delete middleware:', req.params);
  const albumTitle = req.params.album;
  models.Album.findOneAndDelete({ album: albumTitle }, (err, deletedAlbum) => {
    if (err)
      return next({
        log: 'albumController.addAlbum',
        message: 'check log for detials',
      });
    //save to res.locals
    res.locals.deletedAlbum = deletedAlbum;
    return next();
  });
};

module.exports = albumsController;
