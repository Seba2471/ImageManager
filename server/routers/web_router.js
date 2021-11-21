import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Witaj na stronie głownej!');
});

export default router;
