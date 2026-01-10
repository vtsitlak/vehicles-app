import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// load vehicles as a module helps for reusability, independancy, clearability and scalability
// this way we can add more routes and modules on the future without breaking anything
export const routes: Routes = [
  {
    path: 'vehicles',
    loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesModule),
  },
  // as we have only one route we set it as deafult. We can add more routes on the future
  {
    path: '',
    redirectTo: '/vehicles',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
