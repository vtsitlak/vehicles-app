import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VehiclesService } from '../services/vehicles.service';
import { Vehicle } from '../models/vehicle';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Filter } from '../models/filter';
import { distinctUntilChanged, tap, filter, mergeMap } from 'rxjs/operators';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { VehicleItemComponent } from './vehicle-item/vehicle-item.component';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: ['./vehicles.component.scss'],
    imports: [CommonModule, MatProgressSpinnerModule, MatSnackBarModule, FilterFormComponent, VehicleItemComponent]
})
export class VehiclesComponent implements OnInit {
  private vehiclesService = inject(VehiclesService);
  private snackBar = inject(MatSnackBar);

  private filteredVehicles: BehaviorSubject<Vehicle[]> = new BehaviorSubject(undefined);
  private loading: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private filterValues: BehaviorSubject<Filter> = new BehaviorSubject(
    {
      type: '',
      color: '',
      brand: '',
    });
  private types: BehaviorSubject<string[]> = new BehaviorSubject(undefined);
  private brands: BehaviorSubject<string[]> = new BehaviorSubject(undefined);
  private colors: BehaviorSubject<string[]> = new BehaviorSubject(undefined);
  filteredVehicles$: Observable<Vehicle[]> = this.filteredVehicles.asObservable();
  loading$: Observable<boolean> = this.loading.asObservable();
  filterValues$: Observable<Filter> = this.filterValues.asObservable();
  types$: Observable<string[]> = this.types.asObservable();
  brands$: Observable<string[]> = this.brands.asObservable();
  colors$: Observable<string[]> = this.colors.asObservable();
  vehicles: Vehicle[];

  // observable sequence to set loading state to false whenn all date are available
  handleLoading = combineLatest(
    this.loading.asObservable(),
    this.filteredVehicles.asObservable(),
    this.types.asObservable(),
    this.brands.asObservable(),
    this.colors.asObservable(),
  ).pipe(
    distinctUntilChanged(),
    filter(([loading, filteredVehicles, types, brands, colors]) => loading && !!filteredVehicles && !!types && !!brands && !!colors),
    tap(() => this.loading.next(false))
  );


  // observable sequence to call filter method once filteredVehicles are available and each time filterValues are changing
  callFilter = this.filteredVehicles.asObservable().pipe(
    distinctUntilChanged((prev: Vehicle[], curr: Vehicle[]) => JSON.stringify(prev) === JSON.stringify(curr)),
    filter(filteredVehicles => !!filteredVehicles),
    mergeMap(() => this.filterValues.asObservable()),
    distinctUntilChanged(),
    tap((filterValues) => this.filter(filterValues)),
  );

  // observable sequence to update types, brands and colors arrays once filteredVehicles are available and each they change
  updateTables = this.filteredVehicles.asObservable().pipe(
    distinctUntilChanged((prev: Vehicle[], curr: Vehicle[]) => JSON.stringify(prev) === JSON.stringify(curr)),
    filter(filteredVehicles => !!filteredVehicles),
    tap(vehicles => {
      this.updateTypes(vehicles);
      this.updateBrands(vehicles);
      this.updateColors(vehicles);
    }),
  );

  ngOnInit() {
    // load data from service
    this.vehiclesService.getVehicles()
      .subscribe(
        // if load succes init the data and start the subscrition to observales equences
        (data) => {
          this.vehicles = data;
          this.filteredVehicles.next(data);
          this.handleLoading.subscribe();
          this.callFilter.subscribe();
          this.updateTables.subscribe();
        },
        // on fail display the snack bar with the erro message
        (err) => {
          console.error(err);
          this.loading.next(false);
          this.openSnackBar(err, 'reload');
        }
      );
  }

  // update the filterValues ith the value emited from the form
  updateFilter(filterValues: Filter) {
    this.filterValues.next(filterValues);
  }

  // filter the vehicles upon the filterValues
  filter(filterValues: Filter) {
    const vehicles: Vehicle[] = [];
    this.vehicles.map(v => {
      if ((v.brand === filterValues.brand || filterValues.brand === '') &&
        (v.type === filterValues.type || filterValues.type === '') &&
        (v.colors.indexOf(filterValues.color) > -1 || filterValues.color === '')) {
        vehicles.push(v);
      }
    }
    );
    this.filteredVehicles.next(vehicles);
  }

  updateTypes(vehicles: Vehicle[]) {
    const types = [];
    vehicles.map(v => { if (types.indexOf(v.type) === -1) { types.push(v.type); } });
    this.types.next(types);
  }

  updateBrands(vehicles: Vehicle[]) {
    const brands = [];
    vehicles.map(v => { if (brands.indexOf(v.brand) === -1) { brands.push(v.brand); } });
    this.brands.next(brands);
  }

  updateColors(vehicles: Vehicle[]) {
    const colors = [];
    vehicles.map(v => v.colors.map(c => { if (colors.indexOf(c) === -1) { colors.push(c); } }));
    this.colors.next(colors);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    }).onAction().subscribe(() => {
      window.location.reload();
    });
  }
}
