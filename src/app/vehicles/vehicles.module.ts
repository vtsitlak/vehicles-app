import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { FilterFormComponent } from './vehicles/filter-form/filter-form.component';
import { VehicleItemComponent } from './vehicles/vehicle-item/vehicle-item.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { VehiclesService } from './services/vehicles.service';



@NgModule({
  declarations: [VehiclesComponent, FilterFormComponent, VehicleItemComponent],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    HttpClientModule
  ],
  providers: [VehiclesService]
})
export class VehiclesModule { }
