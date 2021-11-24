import express from 'express';

const router = express.Router();

//Uploader
import { uploadImage } from '../services/image/fileService.js';

//Middleware
import { fileExtensionErrorHandlindMiddleware } from '../middleware/fileExtensionMiddleware.js';
import { isAuth } from '../middleware/authMiddleware.js';

//Controller
import userController from '../controllers/userController.js';
import imageController from '../controllers/imageController.js';
import albumController from '../controllers/albumController.js';

router.post('/register', userController.create);
router.post('/login', userController.login);
router.post('/logout', isAuth, userController.logout);

router.get('/images', isAuth, imageController.userImage);
router.post('/image', isAuth, uploadImage.single('image'), fileExtensionErrorHandlindMiddleware, imageController.add);
router.get('/image/:filename', isAuth, imageController.send);
router.delete('/image/:id', isAuth, imageController.delete);

router.post('/album', isAuth, albumController.create);
router.get('/albums', isAuth, albumController.list);
router.post('/album/images/:id', isAuth, albumController.addImages);
router.delete('/album/images/:id', isAuth, albumController.deleteImages);
router.delete('/album/:id', isAuth, albumController.delete);
export default router;
