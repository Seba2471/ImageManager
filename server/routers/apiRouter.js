import express from 'express';

const router = express.Router();

//Uploader
import { uploadImage } from '../services/image/fileService.js';

//Middleware
import { fileExtensionErrorHandlindMiddleware } from '../middleware/fileExtensionMiddleware.js';

//Controller
import userController from '../controllers/userController.js';
import imageController from '../controllers/imageController.js';

router.get('/user', userController.list);
router.post('/register', userController.create);
router.post('/login', userController.login);

router.get('/:id/images', imageController.userImage);
router.post('/image', uploadImage.single('image'), fileExtensionErrorHandlindMiddleware, imageController.add);
router.get('/:id/image/:filename', imageController.send);
router.delete('/image/:id', imageController.delete);
export default router;
