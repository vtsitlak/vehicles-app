import express, { Application } from 'express';
import { getAll, getByFilter } from './get-vehicles.route';

const bodyParser = require('body-parser');
const app: Application = express();
const PORT = 9000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());

app.use('/api/vehicles', (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/api/vehicles', (req, res) => getAll(res));
app.post('/api/vehicles', getByFilter);

const httpServer = app.listen(PORT, () => {
  console.log(`HTTP REST API Server running at http://localhost:${PORT}`);
  console.log('Keep this terminal open while using the app.');
});

httpServer.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the other process, then run npm run server again.`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
