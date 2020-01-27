import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { FilterFormComponent } from './vehicles/filter-form/filter-form.component';
import { VehicleItemComponent } from './vehicles/vehicle-item/vehicle-item.component';



@NgModule({
  declarations: [VehiclesComponent, FilterFormComponent, VehicleItemComponent],
  imports: [
    CommonModule
  ]
})
export class VehiclesModule { }
