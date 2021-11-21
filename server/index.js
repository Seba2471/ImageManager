import { port } from './config.js';
import express from 'express';
import app from './app.js';

app.listen(port, () => {
  console.log(`Server list on the port: ${port}`);
});
