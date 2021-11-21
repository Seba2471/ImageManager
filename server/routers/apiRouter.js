import express from 'express';
const router = express.Router();

//Controller
import userController from '../controllers/userController.js';

router.get('/user', userController.list);
router.post('/register', userController.create);
router.post('/login', userController.login);

export default router;
