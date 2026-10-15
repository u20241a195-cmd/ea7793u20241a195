# TrailQuest Adventure Camp Management Platform

Web application for **TrailQuest Adventure Camps**, a network of adventure camps (hiking, trekking, camping and climbing). It manages reservations, shows the current weather of each camp and supervises the occupancy of the facilities.

## Description

Each adventure camp is specialized in one activity type and has a maximum capacity. Users can review the occupancy of every camp and register new reservations; the application takes the temperature from the Open-Meteo weather API and recalculates the available capacity before saving.

## Features

- Toolbar with the TrailQuest logo, the platform title and an EN / ES language switcher.
- Sidenav (Angular Material) with **Home** and **New Reservation**.
- **Home** (`/home`): "My Adventure Camps" grid with one summary card per camp, listing each reservation (participant name and participants) or "Empty", plus **Total Participants** and **Available Capacity**.
- **New Reservation** (`/reservations/new`): reactive form with activity type, participant name (required, not only spaces) and participants (greater than zero and not above the available capacity).
  - The camp is resolved automatically from the activity type.
  - The current temperature is fetched from Open-Meteo; if it fails, the reservation cannot be created.
  - Capacity is recalculated against fresh data right before the `POST`.
  - Create goes to `/home` only after a successful save; Cancel returns to `/home` without saving.
- Page-not-found view showing the unsupported path, with a button back to Home.
- Internationalization in English (default) and Spanish.
- Accessibility: ARIA attributes and labelled regions.

## Stack

- Angular 22 (standalone components, Signals, new control flow) and TypeScript
- Angular Material (Material 3 theme with the green and orange pre-built palettes)
- `@angular/router` (child routes per bounded context), `HttpClient`
- `@ngx-translate/core` and `@ngx-translate/http-loader`
- json-server 0.17.4 as fake API, Open-Meteo as external weather provider
- Vitest (unit tests)

## Architecture

Domain-driven, layered and component-based. Bounded contexts: `shared`, `adventure-camps` (adventure camps and reservations) and `weather`. Each one is organized in `domain`, `application`, `infrastructure` and `presentation` (`views` for routed components, `components` for reusable ones). Patterns: Request/Response, Resource, Assembler, Api, Endpoint and Store.

## Setup

```bash
npm install

# 1. Fake API (http://localhost:3000)
cd server
npx json-server@0.17.4 --watch db.json

# 2. Application (http://localhost:4200), in another terminal at the project root
npm start
```

Other scripts: `npm run build`, `npm test`.

## Authorship

- **Author:** Sofia Diaz Yurivilca
- **Student code:** u20241a195
- **Private repository:** https://github.com/u20241a195-cmd/ea7793u20241a195
