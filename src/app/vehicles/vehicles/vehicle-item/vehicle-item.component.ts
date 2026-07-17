import { Component, computed, input, ChangeDetectionStrategy } from '@angular/core';
import { Vehicle } from '../../models/vehicle';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
    selector: 'app-vehicle-item',
    templateUrl: './vehicle-item.component.html',
    styleUrls: ['./vehicle-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatGridListModule]
})
export class VehicleItemComponent {

  vehicle = input.required<Vehicle>();

  readonly fallbackImage = 'assets/images/image-not-found-scaled-1150x647.png';

  brand = computed(() => this.vehicle().brand);
  type = computed(() => this.vehicle().type);
  colors = computed(() => this.vehicle().colors);
  img = computed(() => this.vehicle().img);

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    if (image.src.includes(this.fallbackImage)) {
      return;
    }
    image.src = this.fallbackImage;
  }
}
