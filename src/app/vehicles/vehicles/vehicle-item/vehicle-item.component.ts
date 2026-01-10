import { Component, Input } from '@angular/core';
import { Vehicle } from '../../models/vehicle';

@Component({
    selector: 'app-vehicle-item',
    templateUrl: './vehicle-item.component.html',
    styleUrls: ['./vehicle-item.component.scss'],
    standalone: false
})
export class VehicleItemComponent {

  @Input() vehicle: Vehicle;
}
