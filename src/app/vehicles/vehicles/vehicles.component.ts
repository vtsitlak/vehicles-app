import { Component, OnInit, inject, signal, effect, computed } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VehiclesService } from '../services/vehicles.service';
import { Vehicle } from '../models/vehicle';
import { Filter } from '../models/filter';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { VehicleItemComponent } from './vehicle-item/vehicle-item.component';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: ['./vehicles.component.scss'],
    imports: [MatProgressSpinnerModule, MatSnackBarModule, FilterFormComponent, VehicleItemComponent]
})
export class VehiclesComponent implements OnInit {
  private vehiclesService = inject(VehiclesService);
  private snackBar = inject(MatSnackBar);

  private vehicles = signal<Vehicle[] | undefined>(undefined);
  loading = signal(true);
  private filterValues = signal<Filter>({ type: '', color: '', brand: '' });

  filteredVehicles = computed(() => {
    const vehicles = this.vehicles();
    const filter = this.filterValues();
    if (!vehicles) return [];

    return vehicles.filter(v =>
      (v.brand === filter.brand || filter.brand === '') &&
      (v.type === filter.type || filter.type === '') &&
      (v.colors.indexOf(filter.color) > -1 || filter.color === '')
    );
  });

  types = computed(() => {
    const vehicles = this.filteredVehicles();
    const typesSet = new Set<string>();
    vehicles.forEach(v => typesSet.add(v.type));
    return Array.from(typesSet);
  });

  brands = computed(() => {
    const vehicles = this.filteredVehicles();
    const brandsSet = new Set<string>();
    vehicles.forEach(v => brandsSet.add(v.brand));
    return Array.from(brandsSet);
  });

  colors = computed(() => {
    const vehicles = this.filteredVehicles();
    const colorsSet = new Set<string>();
    vehicles.forEach(v => v.colors.forEach(c => colorsSet.add(c)));
    return Array.from(colorsSet);
  });

  constructor() {
    // Set loading to false when all data is available
    effect(() => {
      const vehicles = this.vehicles();
      const filtered = this.filteredVehicles();
      const types = this.types();
      const brands = this.brands();
      const colors = this.colors();

      if (this.loading() && vehicles && filtered.length >= 0 && types.length >= 0 && brands.length >= 0 && colors.length >= 0) {
        this.loading.set(false);
      }
    });
  }

  ngOnInit() {
    // load data from service
    this.vehiclesService.getVehicles()
      .subscribe(
        (data) => {
          this.vehicles.set(data);
        },
        (err) => {
          console.error(err);
          this.loading.set(false);
          this.openSnackBar(err, 'reload');
        }
      );
  }

  // update the filterValues with the value emitted from the form
  updateFilter(filterValues: Filter) {
    this.filterValues.set(filterValues);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    }).onAction().subscribe(() => {
      window.location.reload();
    });
  }
}
