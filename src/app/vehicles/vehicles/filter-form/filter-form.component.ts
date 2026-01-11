import { Component, effect, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Field, form } from '@angular/forms/signals';
import { Filter } from '../../models/filter';

@Component({
    selector: 'app-filter-form',
    templateUrl: './filter-form.component.html',
    styleUrls: ['./filter-form.component.scss'],
    imports: [CommonModule, MatFormFieldModule, MatSelectModule, Field]
})
export class FilterFormComponent {

  private filterModel = signal<Filter>({ type: '', brand: '', color: '' });
  filterForm = form(this.filterModel);
  types = input<string[] | null>(null);
  brands = input<string[] | null>(null);
  colors = input<string[] | null>(null);
  updateFilter = output<Filter>();

  constructor() {
    effect(() => {
      this.updateFilter.emit(this.filterForm().value());
    });
  }
}
