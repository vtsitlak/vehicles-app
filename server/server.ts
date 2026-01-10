import * as express from 'express';
import { Application } from 'express';
import { getVehicles } from './get-vehicles.route';

const bodyParser = require('body-parser');
const app: Application = express();

app.use(bodyParser.json());
app.route('/api/vehicles').get(getVehicles);

const httpServer = app.listen(9000, () => {
    const addr = httpServer.address();
    // address() can return a string (pipe/UNIX socket) or AddressInfo; guard accordingly
    const port = typeof addr === 'string' ? addr : addr?.port;
    console.log(`HTTP REST API Server running at http://localhost:${port}`);
});




