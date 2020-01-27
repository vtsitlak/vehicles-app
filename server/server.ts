import * as express from 'express';
import { Application } from 'express';
import { getVehicles } from './get-vehicles.route';

const bodyParser = require('body-parser');
const app: Application = express();

app.use(bodyParser.json());
app.route('/api/vehicles').get(getVehicles);

const httpServer = app.listen(9000, () => {
    console.log('HTTP REST API Server running at http://localhost:' + httpServer.address().port);
});




