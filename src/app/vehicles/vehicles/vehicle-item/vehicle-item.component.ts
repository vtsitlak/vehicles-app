import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../models/vehicle';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
    selector: 'app-vehicle-item',
    templateUrl: './vehicle-item.component.html',
    styleUrls: ['./vehicle-item.component.scss'],
    standalone: true,
    imports: [CommonModule, MatGridListModule]
})
export class VehicleItemComponent {

  @Input() vehicle: Vehicle;
}
