import express from 'express';

const router = express.Router();

//Uploader
import { uploadImage } from '../services/image/imageService.js';

//Middleware
import { fileExtensionErrorHandlindMiddleware } from '../middleware/fileExtensionMiddleware.js';
import { isAuth } from '../middleware/authMiddleware.js';

//Controller
import userController from '../controllers/userController.js';
import imageController from '../controllers/imageController.js';
import albumController from '../controllers/albumController.js';

router.post('/register', userController.create);
router.post('/login', userController.login);
router.post('/refresh', userController.refreshToken);
router.patch('/change-password', isAuth, userController.changePassword);
router.post('/logout', isAuth, userController.logout);

router.get('/images', isAuth, imageController.userImage);
router.post('/image', isAuth, uploadImage.array('image'), fileExtensionErrorHandlindMiddleware, imageController.add);
router.get('/image/:filename', isAuth, imageController.send);
router.delete('/images', isAuth, imageController.delete);

router.post('/album', isAuth, albumController.create);
router.get('/albums', isAuth, albumController.list);
router.patch('/album/name/:id', isAuth, albumController.changeName);
router.patch('/album/thumbnail/:id', isAuth, albumController.changeThumbnail);
router.post('/album/images/:id', isAuth, albumController.addImages);
router.patch('/album/images/:id', isAuth, albumController.deleteImages);
router.delete('/album/:id', isAuth, albumController.delete);
export default router;
