import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { routes } from './app-routing.module';

describe('AppComponent', () => {

  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatToolbarModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Vehicles application'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Vehicles application');
  });

  it('navigate to "" redirects you to /vehicles', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/vehicles');
  }));
});
