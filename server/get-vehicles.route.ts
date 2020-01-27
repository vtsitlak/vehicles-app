import { Request, Response } from 'express';
import { VEHICLES } from './db-data';

export function getVehicles(req: Request, res: Response) {

  console.log('Retrieving courses data ...');

  setTimeout(() => {

    res.status(200).json({ payload: Object.values(VEHICLES) });

  }, 1000);

}


