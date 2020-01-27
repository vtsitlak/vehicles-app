import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehiclesService } from './services/vehicles.service';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { FilterFormComponent } from './vehicles/filter-form/filter-form.component';
import { VehicleItemComponent } from './vehicles/vehicle-item/vehicle-item.component';

@NgModule({
  declarations: [VehiclesComponent, FilterFormComponent, VehicleItemComponent],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [VehiclesService]
})
export class VehiclesModule { }
