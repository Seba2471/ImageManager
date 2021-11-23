import express from 'express';

const router = express.Router();

//Uploader
import { uploadImage } from '../services/image/fileService.js';

//Controller
import userController from '../controllers/userController.js';
import imageController from '../controllers/imageController.js';

router.get('/user', userController.list);
router.post('/register', userController.create);
router.post('/login', userController.login);

router.post('/image', uploadImage.single('image'), imageController.add);
router.get('/:id/image/:filename', imageController.sendImage);
export default router;
