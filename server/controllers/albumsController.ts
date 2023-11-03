import models from '../models/entryModels';
import { Request, Response, NextFunction } from 'express';
import { SavedEntry } from '../../src/types';

interface AlbumsController {
  getAlbums(req: Request, res: Response, next: NextFunction): void;
  addAlbum(req: Request, res: Response, next: NextFunction): void;
  deleteAlbum(req: Request, res: Response, next: NextFunction): void;
}

const CLIENT_ID = '38ef7ce6023b4c1e8b6057767a412e0c';
const CLIENT_SECRET = 'd5ea58227a2e4ac281ddf010163f8d05';
let token = '';

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
  addAlbum: async (req, res, next) => {
    const newAlbum = req.body;
    const { artist, album } = req.body;

    //if token doesn't exist fetch authtoken from api
    if (token === '') {
      const authParams = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          'grant_type=client_credentials&client_id=' +
          CLIENT_ID +
          '&client_secret=' +
          CLIENT_SECRET,
      };

      try {
        const res = await fetch(
          'https://accounts.spotify.com/api/token',
          authParams
        );
        const auth = await res.json();
        token = auth.access_token;
      } catch (error) {
        return next({
          log: 'albumController.addAlbum',
          message: 'Error fetching token from Spotify API',
        });
      }
    }

    //get album cover art from spotify api
    const searchParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    try {
      const response = await fetch(
        'https://api.spotify.com/v1/search?q=' +
          album +
          'artist:' +
          artist +
          '&type=album&limit=1',
        searchParams
      );
      const data = await response.json();
      newAlbum.coverArt = data.albums.items[0].images[0].url;
    } catch (error) {
      return next({
        log: 'albumController.addAlbum',
        message: 'Error fetching cover art from Spotify API',
      });
    }

    //create entry in DB
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
