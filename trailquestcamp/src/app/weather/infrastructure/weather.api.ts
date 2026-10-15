import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ErrorHandlingEnabledBaseType} from '../../../shared/infrastructure/error-handling-enabled-base-type';
import {WeatherEntity} from '../domain/model/weather.entity';
import {WeatherAssembler} from './weather.assembler';
import {WeatherResponse} from './weather.response';
import {environment} from '../../../environments/environment';

/**
 * Client for the Open-Meteo forecast endpoint.
 *
 * @author Sofia Diaz Yurivilca
 */
export class WeatherApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly endpointUrl =
    `${environment.weatherProviderApiBaseUrl}${environment.weatherProviderForecastEndpointPath}`;
  private readonly assembler = new WeatherAssembler();

  /**
   * Creates an instance of WeatherApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(private readonly http: HttpClient) {
    super();
  }

  /**
   * Retrieves the current weather at a location.
   * @param latitude - Latitude of the location.
   * @param longitude - Longitude of the location.
   * @returns Stream with the current weather.
   */
  getCurrent(latitude: number, longitude: number): Observable<WeatherEntity> {
    return this.http.get<WeatherResponse>(this.endpointUrl, {
      params: {latitude, longitude, current: 'temperature_2m'}
    }).pipe(
      map(response => this.assembler.toEntityFromResponse(response)),
      catchError(this.handleError('Failed to fetch weather'))
    );
  }
}
