import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(
    private http: HttpClient,
  ) { }

  getVehicles(): Observable<Vehicle[]> | any {
    return this.http.get(`/api/vehicles`)
      .pipe(
        map((vehicles: Vehicle[]) => vehicles),
        catchError(this.handleError),
      );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
}
