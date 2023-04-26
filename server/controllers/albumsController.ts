
import models from '../models/entryModels';
import { Request, Response, NextFunction } from 'express';
import { SavedEntry } from '../../src/types';

interface AlbumsController {
  getAlbums(req: Request, res: Response, next: NextFunction): void;
  addAlbum(req: Request, res: Response, next: NextFunction): void;
  deleteAlbum(req: Request, res: Response, next: NextFunction): void;
}

const albumsController: AlbumsController = {
  //get all albums in album collection
  getAlbums: (req, res, next) => {
    models.Album.find((err: any, albums: SavedEntry[]) => {
      if (err)
        return next({
          log: 'albumController.getAlbums',
          message: 'check log for detials',
        });
      res.locals.albums = albums;
      return next();
    });
  },

  //add album to collection
  addAlbum: (req, res, next) => {
    const newAlbum = req.body;
    models.Album.create(newAlbum, (err: any, album: SavedEntry) => {
      if (err)
        return next({
          log: 'albumController.addAlbum',
          message: 'check log for detials',
        });
      res.locals.newAlbum = album;
      return next();
    });
  },

  //delete album from collection
  deleteAlbum: (req, res, next) => {
    const albumId = req.params.album;
    models.Album.findOneAndDelete(
      { _id: albumId },
      (err: any, deletedAlbum: SavedEntry) => {
        if (err)
          return next({
            log: 'albumController.addAlbum',
            message: 'check log for detials',
          });
        res.locals.deletedAlbum = deletedAlbum;
        return next();
      }
    );
  },
};

export default albumsController;
