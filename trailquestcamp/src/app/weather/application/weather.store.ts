import {inject, Service, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {EMPTY, Subject} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {WeatherService} from '../infrastructure/weather.service';

/**
 * Application store that manages the current weather state with Angular Signals.
 *
 * @author Sofia Diaz Yurivilca
 */
@Service()
export class WeatherStore {
  private readonly weatherService = inject(WeatherService);
  private readonly locationRequests = new Subject<{ latitude: number; longitude: number }>();

  private readonly temperatureSignal = signal<number | null>(null);

  /**
   * Readonly signal with the current temperature in °C, or null while unavailable.
   */
  readonly temperature = this.temperatureSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /**
   * Readonly signal indicating if the temperature is being loaded.
   */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal for the current error message (a translation key).
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Creates an instance of WeatherStore; only the latest requested location is kept.
   */
  constructor() {
    this.locationRequests.pipe(
      tap(() => {
        this.temperatureSignal.set(null);
        this.errorSignal.set(null);
        this.loadingSignal.set(true);
      }),
      switchMap(({latitude, longitude}) =>
        this.weatherService.getCurrentWeather(latitude, longitude).pipe(
          catchError(() => {
            this.errorSignal.set('error-load-weather');
            this.loadingSignal.set(false);
            return EMPTY;
          })
        )),
      takeUntilDestroyed()
    ).subscribe(weather => {
      this.temperatureSignal.set(weather.temperature);
      this.loadingSignal.set(false);
    });
  }

  /**
   * Loads the current temperature at a location.
   * @param latitude - Latitude of the location.
   * @param longitude - Longitude of the location.
   */
  loadTemperature = (latitude: number, longitude: number): void => {
    this.locationRequests.next({latitude, longitude});
  };

  /**
   * Clears the temperature, loading and error state.
   */
  clear = (): void => {
    this.temperatureSignal.set(null);
    this.errorSignal.set(null);
    this.loadingSignal.set(false);
  };
}
