# VehiclesApp

A modern Angular application demonstrating vehicle filtering with **Angular 22**, Signals, Signal Forms, and NgRx SignalStore.

## Description

A demo application that displays a list of vehicles filtered by type, brand, and color. Filter values can be selected from dropdown menus, and both the filter options and vehicle list update dynamically based on server-side filtering.

This app showcases modern Angular development patterns including:

- **Angular 22** with standalone components
- **Angular Signals** for reactive state management
- **Signal Forms** (`form()` / `FormField`) for form handling
- **NgRx SignalStore** for centralized state management
- **Angular Material 22** (MDC-based components)
- **OnPush** change detection (Angular 22 default; set explicitly on components)
- **Fetch-based HttpClient** (Angular 22 default)
- **Express.js** backend API with TypeScript
- **RxJS** for reactive programming
- **SCSS** for styling
- **Playwright** for end-to-end tests

## Architecture

### Frontend

- **Standalone Components**: All components are standalone (no NgModules)
- **Signal-Based State**: Uses Angular Signals and computed signals for reactive data flow
- **Signal Forms**: Form handling using Angular's Signal Forms API (`[formField]`)
- **NgRx SignalStore**: Centralized state management with `VehiclesStore` and `VehiclesFacade`
- **Dependency Injection**: Uses `inject()` for modern DI patterns
- **Change Detection**: `ChangeDetectionStrategy.OnPush` on all components

### Backend

- **Express.js** REST API server
- **TypeScript** for type safety
- **Server-side filtering** via POST endpoint
- **CORS** enabled for development

## Prerequisites

Angular 22 requires one of:

- **Node.js v22.22.3+**
- **Node.js v24.15.0+**
- **Node.js v26.0.0+**

Node.js 20 is no longer supported. Check your version:

```bash
node -v
```

Also required:

- **npm** 8.0.0 or higher

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the backend server** (leave this terminal open):

   ```bash
   npm run server
   ```

   The API runs at `http://localhost:9000`.

3. **Start the development server** (second terminal):

   ```bash
   npm start
   ```

   Open `http://localhost:4200/`. The app reloads when you change source files.

> **Note:** Both processes must run together. `npm start` only serves the Angular app; the API is separate. The frontend proxies `/api` to port `9000` via `proxy.json`.

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

- Form state managed with `form()`
- Field bindings using `[formField]` and `FormField`
- Reactive updates without classic reactive form controls

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

```bash
npx ng generate component component-name
```

You can also generate `directive|pipe|service|class|guard|interface|enum`.

### Build

```bash
npm run build
```

Artifacts are written to `dist/`. Use `--configuration production` for a production build.

### Running unit tests

```bash
npm test
```

Or headless (CI-style):

```bash
npx ng test --watch=false --browsers=ChromeHeadless
```

Unit tests run with **Karma** + Jasmine.

### Running end-to-end tests

E2E tests use **Playwright** (Protractor was removed in Angular 22):

```bash
npm run e2e
```

Playwright starts (or reuses) the API on `:9000` and the app on `:4200` automatically.

## Technologies Used

| Technology | Version |
|------------|---------|
| Angular | 22.0.x |
| Angular Material / CDK | 22.0.x |
| TypeScript | 6.0.x |
| NgRx Signals | 21.x (peer-compatible with Angular 22) |
| RxJS | 7.8.x |
| Express.js | 4.22.x |
| Playwright | Latest |
| Node.js | 22.22.3+ / 24.15.0+ / 26+ |

## Further Help

For Angular CLI help, run `npx ng help` or see the [Angular CLI documentation](https://angular.dev/tools/cli).
