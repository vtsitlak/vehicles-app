import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiclesComponent } from './vehicles/vehicles.component';

export const vehiclesRoutes: Routes = [
    {
        path: '',
        component: VehiclesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(vehiclesRoutes)],
    exports: [RouterModule]
})
export class VehiclesRoutingModule { }
