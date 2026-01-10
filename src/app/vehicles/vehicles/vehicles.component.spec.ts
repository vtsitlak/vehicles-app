import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VehiclesComponent } from './vehicles.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { Filter } from '../models/filter';
import { VehiclesService } from '../services/vehicles.service';
import { VehiclesServiceStub } from 'src/testing/vehicles.service-stub';

describe('VehiclesComponent', () => {
  let component: VehiclesComponent;
  let fixture: ComponentFixture<VehiclesComponent>;
  let vehiclesServices: VehiclesService;

  const filterValues: Filter = {
    type: 'car',
    brand: '',
    color: '',
  };

  beforeEach(waitForAsync(() => {
    const bed = TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule, MatSnackBarModule],
      declarations: [VehiclesComponent],
      providers: [
        { provide: VehiclesService, useClass: VehiclesServiceStub },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });
    bed.compileComponents();
    vehiclesServices = bed.get(VehiclesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create VehiclesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should get the vehicles from service', fakeAsync(() => {
    component.filteredVehicles$.subscribe(f => expect(f.length).toBe(6));
  }));

  it('updateFilter method should update filterValues', fakeAsync(() => {
    component.updateFilter(filterValues);
    component.filterValues$.subscribe(f => expect(f).toBe(filterValues));
  }));

  it('changing of filteredvalues should update filteredVehicles', fakeAsync(() => {
    component.updateFilter(filterValues);
    component.filteredVehicles$.subscribe(f => expect(f.length).toBe(1));
  }));

  it('should update table types', fakeAsync(() => {
    component.updateFilter(filterValues);
    component.types$.subscribe(t => expect(t).toEqual(['car']));
  }));

  it('should update table brands', fakeAsync(() => {
    component.updateFilter(filterValues);
    component.brands$.subscribe(b => expect(b).toEqual(['Bugatti Veyron']));
  }));

  it('should update table colors', fakeAsync(() => {
    component.updateFilter(filterValues);
    component.colors$.subscribe(c => expect(c).toEqual(['red', 'black']));
  }));
});
