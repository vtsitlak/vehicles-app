import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FilterFormComponent } from './filter-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterFormComponent', () => {
  let component: FilterFormComponent;
  let fixture: ComponentFixture<FilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatSelectModule],
      declarations: [FilterFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create FilterFormComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should enable form when having available types or brands or colors', () => {
    component.types = ['car'];
    component.brands = ['citroen'];
    component.colors = ['silver'];
    component.ngOnChanges();
    expect(component.filtersForm.enabled).toBeTruthy();
  });

  it('should disable form not having available types or brands or colors', () => {
    component.types = ['car'];
    component.brands = undefined;
    component.colors = ['silver'];
    component.ngOnChanges();
    expect(component.filtersForm.enabled).toBeFalsy();
  });

  it('should emit new filter value when form values changinhg', fakeAsync(() => {
    spyOn(component.updateFilter, 'emit');
    component.filtersForm.setValue({ type: 'car', brand: '', color: 'red' });
    expect(component.updateFilter.emit).toHaveBeenCalledWith({ type: 'car', brand: '', color: 'red' });
  }));
});
