
import express, {Request, Response} from 'express';
import albumsController from '../controllers/albumsController';
const router = express.Router();

//get list of albums that have been saved to db
router.get('/', albumsController.getAlbums, (req: Request, res: Response) =>
  res.status(200).json(res.locals.albums)
);

//add a new album to db
router.post('/album', albumsController.addAlbum, (req: Request, res: Response) =>
  res.status(200).json(res.locals.newAlbum)
);

// Delete an album from the database
// http://localhost:3000/api/"album"
router.delete('/:album', albumsController.deleteAlbum, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.deletedAlbum);
});


export default router;
