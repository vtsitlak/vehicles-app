# VehiclesApp

A modern Angular application demonstrating vehicle filtering capabilities using Angular 21, Signals, Signal Forms, and NgRx SignalStore.

## Description 

A demo application that displays a list of vehicles filtered by type, brand, and color. Filter values can be selected from dropdown menus, and both the filter options and vehicle list update dynamically based on server-side filtering.

This app showcases modern Angular development patterns including:
- **Angular 21** with standalone components
- **Angular Signals** for reactive state management
- **Signal Forms** for form handling
- **NgRx SignalStore** for centralized state management
- **Angular Material** (MDC-based components)
- **Express.js** backend API with TypeScript
- **RxJS** for reactive programming
- **SCSS** for styling

## Architecture

### Frontend
- **Standalone Components**: All components are standalone (no NgModules)
- **Signal-Based State**: Uses Angular Signals and computed signals for reactive data flow
- **Signal Forms**: Form handling using Angular's experimental Signal Forms API
- **NgRx SignalStore**: Centralized state management with `VehiclesStore` and `VehiclesFacade`
- **Dependency Injection**: Uses `inject()` function for modern DI patterns

### Backend
- **Express.js** REST API server
- **TypeScript** for type safety
- **Server-side filtering** via POST endpoint
- **CORS** enabled for development

## Prerequisites

* Node.js **20.19.x** or **22.12+** (LTS versions recommended)
* npm **8.0.0** or higher

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the backend server:**
   ```bash
   npm run server
   ```
   The API server will run on `http://localhost:9000`

3. **Start the development server:**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Project Structure

```
src/app/vehicles/
├── models/
│   ├── vehicle.ts          # Vehicle interface
│   └── filter.ts           # Filter interface
├── services/
│   └── vehicles.service.ts # HTTP service for API calls
├── store/
│   ├── vehicles.store.ts   # NgRx SignalStore
│   └── vehicles.facade.ts  # Facade pattern for components
└── vehicles/
    ├── vehicles.component.ts      # Main component using facade
    ├── filter-form/
    │   └── filter-form.component.ts  # Signal Forms implementation
    └── vehicle-item/
        └── vehicle-item.component.ts  # Display component with signals
```

## Key Features

### Signal Forms
The `FilterFormComponent` uses Angular's Signal Forms API:
- Form state managed with `form()` function
- Field bindings using `[field]` directive
- Reactive updates without traditional form controls

### SignalStore Pattern
State management follows the SignalStore pattern:
- **VehiclesStore**: Centralized store with state, computed signals, and methods
- **VehiclesFacade**: Clean API layer for components
- Reactive updates using signals and `rxMethod` for async operations

### Server-Side Filtering
- **GET `/api/vehicles`**: Retrieves all vehicles
- **POST `/api/vehicles`**: Retrieves filtered vehicles based on request body

## Development

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--configuration production` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests.

## Technologies Used

- **Angular**: 21.0.8
- **Angular Material**: 21.0.6 (MDC-based)
- **NgRx Signals**: Latest
- **RxJS**: 7.8.2
- **TypeScript**: 5.9.3
- **Express.js**: Latest
- **Node.js**: 20.19.x / 22.12+

## Further Help

To get more help on the Angular CLI use `ng help` or check out the [Angular CLI documentation](https://angular.dev/tools/cli).
