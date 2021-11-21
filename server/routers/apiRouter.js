import express from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/uploads/');
  },
  filename: function (req, file, cb) {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

//Controller
import userController from '../controllers/userController.js';
import imageController from '../controllers/imageController.js';

router.get('/user', userController.list);
router.post('/register', userController.create);
router.post('/login', userController.login);

router.post('/image', upload.single('image'), imageController.add);
export default router;
