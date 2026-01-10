import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehiclesService } from './services/vehicles.service';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { FilterFormComponent } from './vehicles/filter-form/filter-form.component';
import { VehicleItemComponent } from './vehicles/vehicle-item/vehicle-item.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [VehiclesComponent, FilterFormComponent, VehicleItemComponent], imports: [CommonModule,
        VehiclesRoutingModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatGridListModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule], providers: [VehiclesService, provideHttpClient(withInterceptorsFromDi())] })
export class VehiclesModule { }
