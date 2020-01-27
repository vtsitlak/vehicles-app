import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Filter } from '../../models/filter';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit, OnChanges {

  filtersForm;
  @Input() types: string[];
  @Input() brands: string[];
  @Input() colors: string[];
  @Output() updateFilter: EventEmitter<Filter> = new EventEmitter<Filter>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.filtersForm = this.formBuilder.group({
      type: '',
      brand: '',
      color: '',
    });
    this.filtersForm.disable();
  }

  ngOnInit() {
    // dynamically emit filterValues to parent component each time form values are changing
    this.filtersForm.valueChanges.subscribe((filterValues: Filter) => {
      this.updateFilter.emit(filterValues);
    });
  }

  ngOnChanges() {
    // dynamically enable or disable the form upon loading value
    (!!this.types && !!this.brands && !!this.colors) ? this.filtersForm.enable() : this.filtersForm.disable();
  }

}
