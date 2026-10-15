import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../../shared/infrastructure/base-api';
import {WeatherEntity} from '../domain/model/weather.entity';
import {WeatherApiEndpoint} from './weather.api';

/**
 * Infrastructure facade for the external weather provider.
 *
 * @author Sofia Diaz Yurivilca
 */
@Service()
export class WeatherService extends BaseApi {
  private readonly weatherEndpoint = new WeatherApiEndpoint(inject(HttpClient));

  getCurrentWeather = (latitude: number, longitude: number): Observable<WeatherEntity> =>
    this.weatherEndpoint.getCurrent(latitude, longitude);
}
