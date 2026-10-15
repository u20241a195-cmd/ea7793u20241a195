/**
 * Application entry point: bootstraps the root component with the application configuration.
 *
 * @author Sofia Diaz Yurivilca
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
