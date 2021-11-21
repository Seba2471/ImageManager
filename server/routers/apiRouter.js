import express from 'express';
const router = express.Router();

//Controller
import userController from '../controllers/userController.js';
import imageController from '../controllers/imageController.js';

router.get('/user', userController.list);
router.post('/register', userController.create);
router.post('/login', userController.login);

router.post('/image', imageController.add);
export default router;
