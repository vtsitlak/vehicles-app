import { Request, Response } from 'express';
import { VEHICLES } from './db-data';

export function getVehicles(req: Request, res: Response) {

  console.log('Retrieving vehicles data ...');

  setTimeout(() => {

    res.status(200).json(Object.values(VEHICLES));

  }, 1000);

}


